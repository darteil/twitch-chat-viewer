import React from "react";
import { render } from "ink";
import App from "./app";
import yargs from "yargs/yargs";

const argv = yargs(process.argv.slice(2)).options({
  c: {
    type: "string",
    alias: "channel",
    description: "Twitch channel name",
    demandOption: true,
  },
}).argv;

render(<App channel={argv.c} />);
