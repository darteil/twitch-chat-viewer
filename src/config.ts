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

type ChannelsListConfig = {
  list: string[];
};

const schemaSettings: JSONSchemaType<Config> = {
  type: "object",
  properties: {
    showMods: {
      type: "boolean",
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

const schemaList: JSONSchemaType<ChannelsListConfig> = {
  type: "object",
  properties: {
    list: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
  required: ["list"],
};

const validateSettings = ajv.compile(schemaSettings);
const validateList = ajv.compile(schemaList);

const homeDir = os.homedir();

const configFilePath = `${homeDir}/.config/twitch-chat-viewer/settings.json`;
const listOfChannelsFilePath = `${homeDir}/.config/twitch-chat-viewer/list-of-streams.json`;

let config: Config = {
  showMods: true,
  moderatorIcon: "◉",
  moderatorIconColor: "#ffffff",
};

let channelsList: ChannelsListConfig = {
  list: [],
};

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
if (fs.existsSync(listOfChannelsFilePath)) {
  channelsList = JSON.parse(
    fs.readFileSync(listOfChannelsFilePath, {
      encoding: "utf8",
    }),
  );
  if (!validateList(channelsList)) {
    console.log(chalk.red("Invalid list of streams config..."));
    process.exit();
  }
} else {
  fs.writeFileSync(listOfChannelsFilePath, JSON.stringify(channelsList, null, 2));
}

const saveChannelToFile = (channel: string) => {
  const channels: ChannelsListConfig = JSON.parse(
    fs.readFileSync(listOfChannelsFilePath, {
      encoding: "utf8",
    }),
  );

  if (!channels.list.includes(channel)) {
    channels.list.push(channel);
    fs.writeFileSync(listOfChannelsFilePath, JSON.stringify(channels, null, 2));
  }
};

const removeChannelFromFile = (channel: string) => {
  const channels: ChannelsListConfig = JSON.parse(
    fs.readFileSync(listOfChannelsFilePath, {
      encoding: "utf8",
    }),
  );

  if (channels.list.includes(channel)) {
    const newList = channels.list.filter((c) => c !== channel);
    channels["list"] = newList;
    fs.writeFileSync(listOfChannelsFilePath, JSON.stringify(channels, null, 2));
  }
};

const getChannelsFromFile = (): ChannelsListConfig => {
  return JSON.parse(
    fs.readFileSync(listOfChannelsFilePath, {
      encoding: "utf8",
    }),
  );
};

export {
  config,
  channelsList,
  Config,
  ChannelsListConfig,
  saveChannelToFile,
  removeChannelFromFile,
  getChannelsFromFile,
};
