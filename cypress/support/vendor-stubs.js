export const chartJsStub = `
(function() {
  class FakeChart {
    constructor(ctx, config) {
      this.ctx = ctx;
      this.canvas = ctx.canvas;
      this.config = config;
      this.data = config.data || { labels: [], datasets: [] };
      this.options = config.options || {};
      FakeChart.instances.push(this);
      this.render();
    }

    render() {
      const ctx = this.ctx;
      const canvas = this.canvas;
      const width = canvas.width || 600;
      const height = canvas.height || 320;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#f8f9fa";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#1a73e8";
      ctx.fillRect(16, height - 28, Math.max(18, (this.data.datasets || []).length * 22), 12);
      ctx.fillStyle = "#202124";
      ctx.font = "12px Arial";
      ctx.fillText((this.data.labels || []).slice(0, 3).join(" | "), 16, 22);
    }

    update() {
      this.render();
    }

    destroy() {
      this.destroyed = true;
    }
  }

  FakeChart.instances = [];
  window.Chart = FakeChart;
})();
`;

export const jsPdfStub = `
(function() {
  class FakeJsPDF {
    constructor() {
      this.operations = [];
      this.internal = {
        pageSize: {
          getWidth: function() { return 842; },
          getHeight: function() { return 595; }
        }
      };
    }

    setFontSize(size) {
      this.operations.push(["setFontSize", size]);
      return this;
    }

    text() {
      this.operations.push(["text", Array.from(arguments)]);
      return this;
    }

    addImage() {
      this.operations.push(["addImage", Array.from(arguments)]);
      return this;
    }

    addPage() {
      this.operations.push(["addPage", Array.from(arguments)]);
      return this;
    }

    autoTable(options) {
      this.operations.push(["autoTable", options]);
      return this;
    }

    save(fileName) {
      const harness = window.__agileCypressHarness;
      harness.pdfExports.push({
        fileName: fileName,
        operations: this.operations.slice()
      });
      return this;
    }
  }

  FakeJsPDF.prototype.autoTable = FakeJsPDF.prototype.autoTable;
  window.jspdf = { jsPDF: FakeJsPDF };
})();
`;

export const jsPdfAutoTableStub = `
(function() {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    return;
  }

  if (!window.jspdf.jsPDF.prototype.autoTable) {
    window.jspdf.jsPDF.prototype.autoTable = function autoTable(options) {
      this.operations = this.operations || [];
      this.operations.push(["autoTable", options]);
      return this;
    };
  }
})();
`;

export const pptxStub = `
(function() {
  class FakeSlide {
    constructor(log) {
      this.log = log;
      this.background = null;
    }

    addText() {
      this.log.push(["addText", Array.from(arguments)]);
    }

    addImage() {
      this.log.push(["addImage", Array.from(arguments)]);
    }

    addTable() {
      this.log.push(["addTable", Array.from(arguments)]);
    }
  }

  class FakePptxGenJS {
    constructor() {
      this.slides = [];
      this.layout = null;
      this.author = null;
      this.company = null;
      this.subject = null;
      this.title = null;
    }

    addSlide() {
      const slideLog = [];
      this.slides.push(slideLog);
      return new FakeSlide(slideLog);
    }

    async writeFile(options) {
      const harness = window.__agileCypressHarness;
      const fileName = typeof options === "string" ? options : options.fileName;
      harness.pptExports.push({
        fileName: fileName,
        slideCount: this.slides.length
      });
    }
  }

  window.PptxGenJS = FakePptxGenJS;
})();
`;
