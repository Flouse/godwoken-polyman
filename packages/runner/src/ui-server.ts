import { polymanConfig } from "./base/config";
import express from "express";
import path from "path";

export const app = express();
app.use(express.static(path.join(__dirname, "../ui")));

app.get("/*", function (req: any, res: { sendFile: (arg0: any) => void }) {
  res.sendFile(path.join(__dirname, "../ui", "index.html"));
});

export function start() {
  app.listen(polymanConfig.http_server_options.ui_port, () => {
    console.log(
      `ui server started at http://localhost:${polymanConfig.http_server_options.ui_port}, go there to deploy contract!`
    );
  });
}
