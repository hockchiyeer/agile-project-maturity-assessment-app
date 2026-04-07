const fs = require("fs");
const http = require("http");
const path = require("path");

const HOST = "127.0.0.1";
const REPO_ROOT = path.resolve(__dirname, "..", "..");

let server;

function getContentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const contentTypes = {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
  };

  return contentTypes[extension] || "application/octet-stream";
}

function resolveFilePath(requestUrl) {
  const normalizedPath = decodeURIComponent((requestUrl || "/").split("?")[0]);
  const relativePath = normalizedPath === "/" ? "/index.html" : normalizedPath;
  const absolutePath = path.resolve(REPO_ROOT, `.${relativePath}`);

  if (!absolutePath.startsWith(REPO_ROOT)) {
    return null;
  }

  return absolutePath;
}

function createServer() {
  return http.createServer((request, response) => {
    const filePath = resolveFilePath(request.url);

    if (!filePath) {
      response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Forbidden");
      return;
    }

    fs.readFile(filePath, (error, fileBuffer) => {
      if (error) {
        const statusCode = error.code === "ENOENT" ? 404 : 500;
        response.writeHead(statusCode, {
          "Content-Type": "text/plain; charset=utf-8",
        });
        response.end(statusCode === 404 ? "Not Found" : "Internal Server Error");
        return;
      }

      response.writeHead(200, {
        "Cache-Control": "no-store",
        "Content-Type": getContentType(filePath),
      });
      response.end(fileBuffer);
    });
  });
}

async function startStaticServer(port = 4173) {
  if (server) {
    return server;
  }

  server = createServer();

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, HOST, resolve);
  });

  return server;
}

module.exports = {
  startStaticServer,
};
