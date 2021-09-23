import React, { useState, useEffect } from "react";
import { Static } from "ink";
import dayjs from "dayjs";
import { Client } from "tmi.js";
import { Config } from "../../config";
import CountOfMessages from "../CountOfMessages";
import CompactMessage from "./CompactMessage";
import DefaultMessage from "./DefaultMessage";
import { Color } from "chalk";

export interface Message {
  id: string | undefined;
  time: string;
  name: string | undefined;
  nameColor: typeof Color | undefined;
  mod: boolean | undefined;
  mess: string;
}

interface State {
  userColors: Map<string, typeof Color>;
  messages: Message[];
}

interface Props {
  client: Client;
  config: Config;
}

const colors: typeof Color[] = [
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "blackBright",
  "redBright",
  "greenBright",
  "yellowBright",
  "blueBright",
  "magentaBright",
  "cyanBright",
];

export const MessagesList: React.FC<Props> = ({ client, config }) => {
  const [state, setState] = useState<State>({
    userColors: new Map(),
    messages: [],
  });
  const [compact, setCompact] = useState(process.stdout.columns < 90 ? true : false);
  const [countOfMessages, setCountOfMessages] = useState(0);

  useEffect(() => {
    console.clear();
    console.log("Welcome to twitch chat...");

    process.stdout.on("resize", () => {
      process.stdout.columns < 90 ? setCompact(true) : setCompact(false);
    });

    client.on("message", (channel, userstate, message) => {
      const time = dayjs().format("hh:mm:ss");

      setCountOfMessages((prevState) => prevState + 1);

      setState((prevState) => {
        const userName = userstate["display-name"] || "noname";
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const newUsers = prevState.userColors.get(userName)
          ? new Map(prevState.userColors)
          : new Map(prevState.userColors.set(userName, randomColor));

        return {
          ...prevState,
          users: newUsers,
          messages: [
            ...prevState.messages,
            {
              id: userstate.id,
              time,
              name: userName,
              nameColor: newUsers.get(userName),
              mod: userstate.mod,
              mess: message,
            },
          ],
        };
      });
    });
  }, []);

  return (
    <>
      <Static items={state.messages}>
        {(message) => (compact ? <CompactMessage key={message.id} message={message} /> : <DefaultMessage key={message.id} message={message} />)}
      </Static>
      <CountOfMessages count={countOfMessages} />
    </>
  );
};
