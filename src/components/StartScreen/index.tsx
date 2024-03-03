import React from "react";
import { Text } from "ink";
import ChannelsList from "./ChannelsList.js";

interface Props {
  isConnect: boolean;
}

const StartScreen = ({ isConnect }: Props) => {
  return (
    <>
      <Text color="green">Welcome to twitch chat viewer!</Text>
      {isConnect && <ChannelsList />}
    </>
  );
};

export default StartScreen;
