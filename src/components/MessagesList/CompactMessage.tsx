import React from "react";
import chalk from "chalk";
import { Box, Text } from "ink";
import { config } from "../../config";
import { Message } from "./MessagesList";

interface Props {
  message: Message;
}

const CompactMessage: React.FC<Props> = ({ message }) => (
  <Box width={process.stdout.columns} paddingBottom={1} flexDirection="column">
    <Box flexDirection="row">
      <Box>
        <Text>{`${chalk.black.bgYellow(message.time)} `}</Text>
      </Box>
      <Box justifyContent="flex-end">
        <Text wrap="truncate">
          {`${message.mod ? chalk.hex(config.moderatorIconColor || "#ffffff")(`${config.moderatorIcon}`) : ""} ${
            message.nameColor ? chalk[message.nameColor](message.name) : message.name
          } `}
        </Text>
      </Box>
    </Box>
    <Box>
      <Text>{message.mess}</Text>
    </Box>
  </Box>
);

export default CompactMessage;
