import os from "os";
import fs from "fs";
import chalk from "chalk";
import Ajv, { JSONSchemaType } from "ajv";

const ajv = new Ajv();

type Colors = {
  time: string;
  nickname: string;
  message: string;
};

type Config = {
  colors: Colors;
};

const schema: JSONSchemaType<Config> = {
  type: "object",
  properties: {
    colors: {
      type: "object",
      properties: {
        time: { type: "string" },
        nickname: { type: "string" },
        message: { type: "string" },
      },
      required: ["time", "nickname", "message"],
    },
  },
  required: ["colors"],
  additionalProperties: false,
};

const validate = ajv.compile(schema);
const homeDir = os.homedir();

const configFilePath = `${homeDir}/.config/.twitch-chat-viewer.json`;

let config: Config = {
  colors: {
    time: "red",
    nickname: "green",
    message: "#fbf1c7",
  },
};

if (fs.existsSync(configFilePath)) {
  config = JSON.parse(
    fs.readFileSync(`${homeDir}/.config/.twitch-chat-viewer.json`, {
      encoding: "utf8",
    })
  );
  if (!validate(config)) {
    console.log(chalk.red("Invalid config..."));
    process.exit();
  }
} else {
  fs.writeFileSync(
    `${homeDir}/.config/.twitch-chat-viewer.json`,
    JSON.stringify(config, null, 2)
  );
}

export { config, Config };
