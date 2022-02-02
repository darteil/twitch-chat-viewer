import React, { FunctionComponent, useState, useEffect, useContext } from "react";
import { Client } from "tmi.js";
import { Box, Text } from "ink";
import { AppContext } from "./App";

interface Props {
  client: Client;
}

const RoomState: FunctionComponent<Props> = ({ client }) => {
  const { mods } = useContext(AppContext);

  return (
    <Box flexDirection="column">
      <Text dimColor color={`${mods.followersOnly ? "green" : "white"}`}>
        Followers-only: {mods.followersOnly ? "on" : "off"}
      </Text>
      <Text dimColor color={`${mods.subsOnly ? "green" : "white"}`}>
        Subs-only: {mods.subsOnly ? "on" : "off"}
      </Text>
      <Text dimColor color={`${mods.emoteOnly ? "green" : "white"}`}>
        Emote-only: {mods.emoteOnly ? "on" : "off"}
      </Text>
      <Text dimColor color={`${mods.slow ? "green" : "white"}`}>
        Slow mod: {mods.slow ? "on" : "off"}
      </Text>
    </Box>
  );
};

export default RoomState;
