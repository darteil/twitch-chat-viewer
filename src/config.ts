import os from "os";
import fs from "fs";
import chalk from "chalk";
import Ajv, { JSONSchemaType } from "ajv";

const ajv = new Ajv();

type Config = {
  showMods: boolean;
  moderatorIcon: string;
  moderatorIconColor: string;
};

const schema: JSONSchemaType<Config> = {
  type: "object",
  properties: {
    showMods: {
      type: "boolean"
    },
    moderatorIcon: {
      type: "string",
    },
    moderatorIconColor: {
      type: "string",
    },
  },
  required: ["moderatorIcon"],
  additionalProperties: false,
};

const validate = ajv.compile(schema);
const homeDir = os.homedir();

const configFilePath = `${homeDir}/.config/.twitch-chat-viewer.json`;

let config: Config = {
  showMods: true,
  moderatorIcon: "◉",
  moderatorIconColor: "#ffffff",
};

if (fs.existsSync(configFilePath)) {
  config = JSON.parse(
    fs.readFileSync(`${homeDir}/.config/.twitch-chat-viewer.json`, {
      encoding: "utf8",
    }),
  );
  if (!validate(config)) {
    console.log(chalk.red("Invalid config..."));
    process.exit();
  }
} else {
  fs.writeFileSync(`${homeDir}/.config/.twitch-chat-viewer.json`, JSON.stringify(config, null, 2));
}

export { config, Config };
