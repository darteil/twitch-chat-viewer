import React from "react";
import { Text } from "ink";

interface Props {
  count: number;
}

const CountOfMessages = ({ count }: Props) => (
  <Text dimColor color="white">
    Messages: {count}
  </Text>
);

export default CountOfMessages;
