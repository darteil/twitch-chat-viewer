import React from "react";
import chalk from "chalk";
import { Box, Text } from "ink";
import { config } from "../../config";
import { Message } from "./MessagesList";

interface Props {
  message: Message;
}

const CompactList: React.FC<Props> = ({ message }) => (
  <Box
    width={process.stdout.columns}
    paddingLeft={1}
    paddingRight={1}
    borderStyle={message.time === "" ? undefined : "round"}
    key={message.id}
    flexDirection="column"
  >
    <Box flexDirection="row">
      <Box>
        <Text color={config.colors.time}>{`${message.time} `}</Text>
      </Box>
      <Box justifyContent="flex-end">
        <Text color={config.colors.nickname} wrap="truncate">
          {`${message.mod ? chalk.hex(config.moderatorIconColor || "#ffffff")(`${config.moderatorIcon}`) : ""} ${
            message.name
          } `}
        </Text>
      </Box>
    </Box>
    <Box>
      <Text color={config.colors.message}>{message.mess}</Text>
    </Box>
  </Box>
);

export default CompactList;
