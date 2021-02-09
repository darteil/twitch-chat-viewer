import React, { FunctionComponent, useState, useEffect } from "react";
import { Static, Box, Text } from "ink";
import chalk from "chalk";
import dayjs from "dayjs";
import { Client } from "tmi.js";
import { Config } from "./config";
import CountOfMessages from "./CountOfMessages";

interface Message {
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

const MessagesList: FunctionComponent<Props> = ({ client, config }) => {
  const [messages, setMessages] = useState<Array<Message>>([]);

  useEffect(() => {
    client.on("message", (channel, userstate, message) => {
      const time = dayjs().format("hh:mm:ss");

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
        {(message) => (
          <Box key={message.id} flexDirection="row" flexShrink={0}>
            <Box flexShrink={0} minWidth="8">
              <Text color={config.colors.time}>{`${message.time} `}</Text>
            </Box>
            <Box flexShrink={0} justifyContent="flex-end" width="20">
              <Text color={config.colors.nickname} wrap="truncate">
                {`${message.mod ? chalk.blue("◉") : ""} ${message.name} `}
              </Text>
            </Box>
            <Box flexShrink={0} width="70">
              <Text color={config.colors.message}>{message.mess}</Text>
            </Box>
          </Box>
        )}
      </Static>
      <CountOfMessages count={messages.length} />
    </>
  );
};

export default MessagesList;
