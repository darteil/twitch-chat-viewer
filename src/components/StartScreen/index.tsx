import React from "react";
import { Text } from "ink";
import ChannelsList from "./ChannelsList";

const StartScreen = () => {
  return (
    <>
      <Text color="green">Welcome to twitch chat viewer!</Text>

      <ChannelsList />
    </>
  );
};

export default StartScreen;
