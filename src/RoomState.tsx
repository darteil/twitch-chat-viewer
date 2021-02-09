import React, { FunctionComponent, useState, useEffect } from "react";
import { Client } from "tmi.js";
import { Box, Text } from "ink";

interface Props {
  client: Client;
}

const RoomState: FunctionComponent<Props> = ({ client }) => {
  const [followersOnly, setFollowersOnly] = useState(false);
  const [subsOnly, setSubsOnly] = useState(false);
  const [emoteOnly, setEmoteOnly] = useState(false);
  const [slowMod, setSlowMod] = useState(false);

  useEffect(() => {
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
  }, []);

  return (
    <Box marginTop={1} flexDirection="column">
      {followersOnly && (
        <Text dimColor color="white">
          Followers-only
        </Text>
      )}
      {subsOnly && (
        <Text dimColor color="white">
          Subs-only
        </Text>
      )}
      {emoteOnly && (
        <Text dimColor color="white">
          Emote-only
        </Text>
      )}
      {slowMod && (
        <Text dimColor color="white">
          Slow mod
        </Text>
      )}
    </Box>
  );
};

export default RoomState;
