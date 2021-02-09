import React, { FunctionComponent } from "react";
import { Text } from "ink";

interface Props {
  count: number;
}

const CountOfMessages: FunctionComponent<Props> = ({ count }) => (
  <Text dimColor color="white">
    Messages: {count}
  </Text>
);

export default CountOfMessages;
