import React, { FunctionComponent, useState, useEffect } from "react";
import { Client } from "tmi.js";
import { useInput } from "ink";
import RoomState from "./RoomState";
import { Config } from "../config";
import MessagesList from "./MessagesList";

interface Props {
  config: Config;
  channel: string;
}

const App: FunctionComponent<Props> = ({ channel, config }) => {
  const [client] = useState(
    new Client({
      connection: { reconnect: true },
      channels: [channel],
    }),
  );

  useInput((input) => {
    if (input === "q") {
      process.exit();
    }
  });

  useEffect(() => {
    client.connect();

    process.stdout.on("resize", () => {
      console.log(process.stdout.rows, process.stdout.columns);
    });

    return () => {
      client.removeAllListeners();
      client.disconnect();
    };
  }, []);

  return (
    <>
      <MessagesList client={client} config={config} />
      <RoomState client={client} />
    </>
  );
};
export default App;
