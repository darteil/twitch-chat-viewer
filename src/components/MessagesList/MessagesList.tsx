import React, { useState, useEffect } from "react";
import { Static } from "ink";
import dayjs from "dayjs";
import { Client } from "tmi.js";
import { Config } from "../../config";
import CountOfMessages from "../CountOfMessages";
import CompactList from "./CompactList";
import DefaultList from "./DefaultList";

export interface Message {
  id: string | undefined;
  time: string;
  name: string | undefined;
  mod: boolean | undefined;
  mess: string;
}

interface Props {
  client: Client;
  config: Config;
}

export const MessagesList: React.FC<Props> = ({ client, config }) => {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [compact, setCompact] = useState(process.stdout.columns < 90 ? true : false);
  const [countOfMessages, setCountOfMessages] = useState(0);

  useEffect(() => {
    console.clear();
    console.log("Welcome to twitch chat...");
    process.stdout.on("resize", () => {
      process.stdout.columns < 90 ? setCompact(true) : setCompact(false);
    });

    const emptyLines: Message[] = [];
    const emptyLinesCount = config.showMods ? process.stdout.rows - 8 : process.stdout.rows - 3;

    for (let i = 0; i < emptyLinesCount; i++) {
      emptyLines.push({
        id: `${i}-empty`,
        time: "",
        name: "",
        mod: false,
        mess: " ",
      });
    }

    setMessages(emptyLines);

    client.on("message", (channel, userstate, message) => {
      const time = dayjs().format("hh:mm:ss");

      setCountOfMessages((prevState) => prevState + 1);

      setMessages((prevState): Message[] => {
        return [
          ...prevState,
          {
            id: userstate.id,
            time,
            name: userstate["display-name"],
            mod: userstate.mod,
            mess: message,
          },
        ];
      });
    });
  }, []);

  return (
    <>
      <Static items={messages}>
        {(message) => (compact ? <CompactList message={message} /> : <DefaultList message={message} />)}
      </Static>
      <CountOfMessages count={countOfMessages} />
    </>
  );
};
