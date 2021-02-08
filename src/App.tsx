import React, { FunctionComponent, useState, useEffect } from "react";
import chalk from "chalk";
import dayjs from "dayjs";
import * as tmi from "tmi.js";
import { Static, Box, Text } from "ink";
import { Config } from "./config";

interface Message {
  id: string | undefined;
  time: string;
  name: string | undefined;
  mod: boolean | undefined;
  mess: string;
}

interface Props {
  config: Config;
  channel: string;
}

const App: FunctionComponent<Props> = ({ channel, config }) => {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [followersOnly, setFollowersOnly] = useState(false);
  const [subsOnly, setSubsOnly] = useState(false);
  const [emoteOnly, setEmoteOnly] = useState(false);
  const [slowMod, setSlowMod] = useState(false);

  useEffect(() => {
    const client = new tmi.Client({
      connection: { reconnect: true },
      channels: [channel],
    });

    client.connect();

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

    client.on("roomstate", (channel, state) => {
      const followersOnlyStatus = Number(state["followers-only"]);
      const subsOnlyStatus = Number(state["subs-only"]);
      const emoteOnlyStatus = Number(state["emote-only"]);
      const slowModStatus = Number(state["slow"]);

      if (followersOnlyStatus >= 0) {
        setFollowersOnly(true);
      }

      if (subsOnlyStatus > 0) {
        setSubsOnly(true);
      }

      if (emoteOnlyStatus > 0) {
        setEmoteOnly(true);
      }

      if (slowModStatus) {
        setSlowMod(true);
      }
    });

    return () => {
      client.disconnect();
    };
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

      <Box marginTop={1} flexDirection="column">
        {followersOnly && <Text dimColor>Followers-only chat</Text>}
        {subsOnly && <Text dimColor>Subs-only chat</Text>}
        {emoteOnly && <Text dimColor>Emote-only chat</Text>}
        {slowMod && <Text dimColor>Slow mod</Text>}
        <Text color="white">Messages: {messages.length}</Text>
      </Box>
    </>
  );
};
export default App;
