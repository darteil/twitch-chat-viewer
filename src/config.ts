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

type StreamsListConfig = {
  list: string[]
}

const schemaSettings: JSONSchemaType<Config> = {
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

const schemaList: JSONSchemaType<StreamsListConfig> = {
  type: "object",
  properties: {
    list: {
      type: "array",
      items: {
        type: "string"
      }
    }
  },
  required: ["list"]
}

const validateSettings = ajv.compile(schemaSettings);
const validateList = ajv.compile(schemaList);

const homeDir = os.homedir();

const configFilePath = `${homeDir}/.config/twitch-chat-viewer/settings.json`;
const listOfStreamsFilePath = `${homeDir}/.config/twitch-chat-viewer/list-of-streams.json`;

let config: Config = {
  showMods: true,
  moderatorIcon: "◉",
  moderatorIconColor: "#ffffff",
};

let streamsList: StreamsListConfig = {
  list: []
}

// settings.json
if (fs.existsSync(configFilePath)) {
  config = JSON.parse(
    fs.readFileSync(configFilePath, {
      encoding: "utf8",
    }),
  );
  if (!validateSettings(config)) {
    console.log(chalk.red("Invalid settings config..."));
    process.exit();
  }
} else {
  const configDirPath = `${homeDir}/.config/twitch-chat-viewer`;

  if (!fs.existsSync(configDirPath)) {
    fs.mkdirSync(configDirPath);
  }
  fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
}

// list-of-streams.json
if (fs.existsSync(listOfStreamsFilePath)) {
  streamsList = JSON.parse(
    fs.readFileSync(listOfStreamsFilePath, {
      encoding: "utf8",
    }),
  );
  if (!validateList(streamsList)) {
    console.log(chalk.red("Invalid list of streams config..."));
    process.exit();
  }
} else {
  fs.writeFileSync(listOfStreamsFilePath, JSON.stringify(streamsList, null, 2));
}

const saveStream = (channel: string) => {
  const channels: StreamsListConfig = JSON.parse(
    fs.readFileSync(listOfStreamsFilePath, {
      encoding: "utf8",
    }),
  );

  if (!channels.list.includes(channel)) {
    channels.list.push(channel);
    fs.writeFileSync(listOfStreamsFilePath, JSON.stringify(channels, null, 2));
  }
}

const removeStream = (channel: string) => {
  const channels: StreamsListConfig = JSON.parse(
    fs.readFileSync(listOfStreamsFilePath, {
      encoding: "utf8",
    }),
  );

  if (channels.list.includes(channel)) {
    const newList = channels.list.filter((c) => c !== channel)
    channels["list"] = newList;
    fs.writeFileSync(listOfStreamsFilePath, JSON.stringify(channels, null, 2));
  }
}

const getStreams = (): StreamsListConfig => {
  return JSON.parse(
    fs.readFileSync(listOfStreamsFilePath, {
      encoding: "utf8",
    }),
  );
}

export { config, streamsList, Config, StreamsListConfig, saveStream, removeStream, getStreams };
