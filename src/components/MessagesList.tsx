import React, { FunctionComponent, useState, useEffect } from "react";
import { Static, Box, Text } from "ink";
import chalk from "chalk";
import dayjs from "dayjs";
import { Client } from "tmi.js";
import { Config } from "../config";
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
  const [showTime, setShowTime] = useState(process.stdout.columns >= 107 ? true : false);

  const moderatorIconColor = config.moderatorIconColor || "#ffffff";

  useEffect(() => {
    process.stdout.on("resize", () => {
      process.stdout.columns >= 107 ? setShowTime(true) : setShowTime(false);
    });

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
          <Box key={message.id} flexDirection="row">
            {showTime && (
              <Box width="9">
                <Text color={config.colors.time}>{`${message.time} `}</Text>
              </Box>
            )}
            <Box justifyContent="flex-end" width="20">
              <Text color={config.colors.nickname} wrap="truncate">
                {`${message.mod ? chalk.hex(moderatorIconColor)(`${config.moderatorIcon}`) : ""} ${message.name} `}
              </Text>
            </Box>
            <Box width="70">
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
