import {
  chartJsStub,
  jsPdfAutoTableStub,
  jsPdfStub,
  pptxStub,
} from "./vendor-stubs";

const vendorResponses = [
  {
    matcher: /\/chart\.js@.*\/dist\/chart\.umd\.min\.js$/,
    body: chartJsStub,
  },
  {
    matcher: /\/jspdf@.*\/dist\/jspdf\.umd\.min\.js$/,
    body: jsPdfStub,
  },
  {
    matcher: /\/jspdf-autotable@.*\/dist\/jspdf\.plugin\.autotable\.min\.js$/,
    body: jsPdfAutoTableStub,
  },
  {
    matcher: /\/pptxgenjs@.*\/dist\/pptxgen\.bundle\.js$/,
    body: pptxStub,
  },
];

function registerVendorStubs() {
  vendorResponses.forEach(({ matcher, body }) => {
    cy.intercept("GET", matcher, {
      statusCode: 200,
      headers: {
        "cache-control": "no-store",
        "content-type": "application/javascript; charset=utf-8",
      },
      body,
    });
  });
}

function normalizeWritableData(data) {
  if (typeof data === "string") {
    return Promise.resolve(data);
  }

  if (data instanceof Blob) {
    return data.text();
  }

  if (data && typeof data.text === "function") {
    return data.text();
  }

  if (typeof data === "object") {
    return Promise.resolve(JSON.stringify(data));
  }

  return Promise.resolve(String(data ?? ""));
}

function createJsonHandle(win, harness, getDescriptor) {
  return {
    kind: "file",
    get name() {
      return getDescriptor().name;
    },
    async createWritable() {
      const descriptor = getDescriptor();
      const writeRecord = {
        closed: false,
        contents: "",
        name: descriptor.name,
      };

      harness.linkedWrites.push(writeRecord);

      return {
        async write(data) {
          writeRecord.contents = await normalizeWritableData(data);
        },
        async close() {
          writeRecord.closed = true;
        },
      };
    },
    async getFile() {
      const descriptor = getDescriptor();
      return new win.File([descriptor.contents], descriptor.name, {
        type: "application/json",
      });
    },
  };
}

function installBrowserHarness(win) {
  const harness = {
    anchorDownloads: [],
    downloads: [],
    linkedSaveFile: {
      contents: "{}",
      name: "agile-project-maturity-audit.json",
    },
    linkedWrites: [],
    nextOpenFile: {
      contents: "{}",
      name: "saved-assessment.json",
    },
    pdfExports: [],
    pptExports: [],
  };

  win.__agileCypressHarness = harness;

  const originalAnchorClick = win.HTMLAnchorElement.prototype.click;
  win.HTMLAnchorElement.prototype.click = function patchedAnchorClick() {
    if (this.download) {
      harness.anchorDownloads.push({
        download: this.download,
        href: this.href,
      });
      return;
    }

    return originalAnchorClick.call(this);
  };

  win.URL.createObjectURL = blob => {
    const url = `blob:agile-cypress-${harness.downloads.length + 1}`;
    harness.downloads.push({
      blob,
      revoked: false,
      url,
    });
    return url;
  };

  win.URL.revokeObjectURL = url => {
    const entry = harness.downloads.find(candidate => candidate.url === url);
    if (entry) {
      entry.revoked = true;
    }
  };

  const saveHandle = createJsonHandle(win, harness, () => harness.linkedSaveFile);
  const openHandle = createJsonHandle(win, harness, () => harness.nextOpenFile);

  win.showSaveFilePicker = async options => {
    harness.linkedSaveFile.name =
      options?.suggestedName || harness.linkedSaveFile.name;
    return saveHandle;
  };

  win.showOpenFilePicker = async () => [openHandle];
}

Cypress.Commands.add("getByTestId", testId => {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add("openAgileApp", (viewportName, width, height) => {
  registerVendorStubs();
  cy.viewport(width, height);
  cy.visit("/", {
    onBeforeLoad(win) {
      installBrowserHarness(win);
    },
  });
  cy.getByTestId("app-root").should("be.visible");
  cy.window().its("__AGILE_MATURITY_APP__").should("exist");
});

Cypress.Commands.add("findQuestionRowByVirtue", virtue => {
  return cy
    .get('[data-testid="question-row"]')
    .filter((index, row) => {
      const input = row.querySelector('[data-testid="virtue-input"]');
      return Boolean(input) && input.value === virtue;
    })
    .first();
});

Cypress.Commands.add("findDisciplineCard", discipline => {
  return cy
    .get('[data-testid="discipline-scorecard"]')
    .filter((index, card) => card.getAttribute("data-discipline") === discipline)
    .first();
});

Cypress.Commands.add(
  "replaceInputValue",
  { prevSubject: "element" },
  (subject, value) => {
    return cy
      .wrap(subject)
      .clear({ force: true })
      .type(String(value), { force: true })
      .blur();
  }
);

Cypress.Commands.add("setDateValue", { prevSubject: "element" }, (subject, value) => {
  return cy.wrap(subject).then($input => {
    const input = $input[0];
    const { Event } = input.ownerDocument.defaultView;
    input.value = String(value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
    input.dispatchEvent(new Event("blur", { bubbles: true }));
  });
});

Cypress.Commands.add("primeOpenJsonFixture", fixtureName => {
  return cy.fixture(fixtureName, "utf8").then(contents => {
    cy.window().then(win => {
      win.__agileCypressHarness.nextOpenFile = {
        contents,
        name: fixtureName,
      };
    });
  });
});

Cypress.Commands.add("readLastDownloadedJson", () => {
  return cy
    .window()
    .its("__agileCypressHarness.downloads")
    .should(downloads => {
      expect(downloads.length).to.be.greaterThan(0);
    })
    .then(downloads => downloads.at(-1).blob.text().then(JSON.parse));
});

Cypress.Commands.add("readLastLinkedWriteJson", (minimumWrites = 1) => {
  return cy
    .window()
    .its("__agileCypressHarness.linkedWrites")
    .should(writes => {
      expect(writes.length).to.be.at.least(minimumWrites);
      expect(writes.at(-1).contents).to.not.equal("");
    })
    .then(writes => JSON.parse(writes.at(-1).contents));
});

Cypress.Commands.add("getHarness", () => {
  return cy.window().its("__agileCypressHarness");
});

Cypress.Commands.add("getAppState", () => {
  return cy.window().its("__AGILE_MATURITY_APP__").invoke("getState");
});



