import React from "react";
import { render } from "ink";
import yargs from "yargs/yargs";
import { config } from "./config";
import App from "./App";

const argv = yargs(process.argv.slice(2)).options({
  c: {
    type: "string",
    alias: "channel",
    description: "Twitch channel name",
    demandOption: true,
  },
}).argv;

render(<App config={config} channel={argv.c} />);
