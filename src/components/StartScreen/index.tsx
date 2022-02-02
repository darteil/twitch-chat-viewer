import React from "react";
import { Text } from "ink";
import ChannelsList from "./ChannelsList";

interface Props {
  isConnect: boolean;
}

const StartScreen: React.FC<Props> = ({ isConnect }) => {
  return (
    <>
      <Text color="green">Welcome to twitch chat viewer!</Text>
      {isConnect && <ChannelsList />}
    </>
  );
};

export default StartScreen;
