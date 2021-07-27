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
      <Text dimColor color={`${followersOnly ? "green" : "white"}`}>
        Followers-only: {followersOnly ? "on" : "off"}
      </Text>
      <Text dimColor color={`${subsOnly ? "green" : "white"}`}>
        Subs-only: {subsOnly ? "on" : "off"}
      </Text>
      <Text dimColor color={`${emoteOnly ? "green" : "white"}`}>
        Emote-only: {emoteOnly ? "on" : "off"}
      </Text>
      <Text dimColor color={`${slowMod ? "green" : "white"}`}>
        Slow mod: {slowMod ? "on" : "off"}
      </Text>
    </Box>
  );
};

export default RoomState;
