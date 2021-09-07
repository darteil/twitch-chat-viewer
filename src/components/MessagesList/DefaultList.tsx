import React from "react";
import chalk from "chalk";
import { Box, Text } from "ink";
import { config } from "../../config";
import { Message } from "./MessagesList";

interface Props {
  message: Message;
}

const DefaultList: React.FC<Props> = ({ message }) => (
  <Box key={message.id} flexDirection="row">
    <Box width="9">
      <Text color={config.colors.time}>{`${message.time} `}</Text>
    </Box>
    <Box justifyContent="flex-end" width="20">
      <Text color={config.colors.nickname} wrap="truncate">
        {`${message.mod ? chalk.hex(config.moderatorIconColor || "#ffffff")(`${config.moderatorIcon}`) : ""} ${
          message.name
        } `}
      </Text>
    </Box>
    <Box width="70">
      <Text color={config.colors.message}>{message.mess}</Text>
    </Box>
  </Box>
);

export default DefaultList;
