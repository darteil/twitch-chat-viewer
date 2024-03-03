import React from "react";
import chalk from "chalk";
import { Box, Text } from "ink";
import { config } from "../../config.js";
import { Message } from "./MessagesList.js";

interface Props {
  message: Message;
}

const DefaultMessage = ({ message }: Props) => (
  <Box flexDirection="row">
    <Box width="9">
      <Text>{`${chalk.black.bgYellow(message.time)} `}</Text>
    </Box>
    <Box justifyContent="flex-end" width="25">
      <Text wrap="truncate">
        {`${message.mod ? chalk.hex(config.moderatorIconColor || "#ffffff")(`${config.moderatorIcon}`) : ""} ${
          message.nameColor ? chalk[message.nameColor](message.name) : message.name
        } `}
      </Text>
    </Box>
    <Box width="65">
      <Text>{message.mess}</Text>
    </Box>
  </Box>
);

export default DefaultMessage;
