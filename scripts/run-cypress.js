const path = require("path");
const { spawn } = require("child_process");

const cliArgs = process.argv.slice(2);
const environment = { ...process.env };
delete environment.ELECTRON_RUN_AS_NODE;

const cypressCli = path.join(process.cwd(), "node_modules", "cypress", "bin", "cypress");
const child = spawn(process.execPath, [cypressCli, ...cliArgs], {
  cwd: process.cwd(),
  env: environment,
  stdio: "inherit",
});

child.on("exit", code => {
  process.exit(code ?? 1);
});

child.on("error", error => {
  console.error("Unable to launch Cypress:", error);
  process.exit(1);
});
