import React, { useState, useEffect, useContext } from "react";
import { Text, Box, useInput } from "ink";
import SelectInput, { ItemProps } from "ink-select-input";
import TextInput from "ink-text-input";
import { AppContext } from "../App.js";
import { saveChannelToFile, removeChannelFromFile, getChannelsFromFile } from "../../config.js";

interface Channel {
  label: string;
  value: string;
}

const ChannelsList = () => {
  const [list, setList] = useState<Channel[]>([]);
  const [focusList, setFocusList] = useState(true);
  const [currentChannel, setCurrentChannel] = useState("");
  const [showInputChannelName, setShowInputChannelName] = useState(false);
  const [newChannel, setNewChannel] = useState("");
  const { setChannel, setShowStartPage, setEnterChannelNameStatus } = useContext(AppContext);

  const highlightChannel = (item: ItemProps) => {
    setCurrentChannel(item.label);
  };

  const openChannel = (item: ItemProps) => {
    setChannel(item.label);
    setShowStartPage(false);
  };

  const addChannel = (item: string) => {
    setShowInputChannelName(false);
    setEnterChannelNameStatus(false);
    if (item) {
      saveChannelToFile(item);
    }
    updateList();
  };

  const removeChannel = () => {
    if (currentChannel === "") return;
    removeChannelFromFile(currentChannel);
    updateList();
  };

  const updateList = () => {
    const { list } = getChannelsFromFile();
    setList(list.map((channel) => ({ label: channel, value: channel })));
  };

  useInput(
    (input) => {
      if (input === "a") {
        setShowInputChannelName(true);
        setFocusList(false);
      }
      if (input === "r") {
        removeChannel();
      }
    },
    { isActive: !showInputChannelName },
  );

  useEffect(() => {
    updateList();
  }, []);

  useEffect(() => {
    setFocusList(true);
    setCurrentChannel(list[0] ? list[0].label : "");
  }, [list]);

  return (
    <>
      <Box flexDirection="column" margin={1}>
        {list.length === 0 && <Text>Channels list is empty</Text>}
        {list.length > 0 && (
          <SelectInput isFocused={focusList} items={list} onHighlight={highlightChannel} onSelect={openChannel} />
        )}
      </Box>
      <Box>
        {showInputChannelName && (
          <>
            <Box marginRight={1}>
              <Text>Enter channel name:</Text>
            </Box>
            <TextInput value={newChannel} onSubmit={addChannel} onChange={setNewChannel} />
          </>
        )}
        {!showInputChannelName && (
          <Box flexDirection="column">
            <Text color="green" dimColor>
              Enter - select channel
            </Text>
            <Text color="green" dimColor>
              a - add channel
            </Text>
            <Text color="green" dimColor>
              r - remove channel
            </Text>
            <Text color="green" dimColor>
              q - exit
            </Text>
          </Box>
        )}
      </Box>
    </>
  );
};

export default ChannelsList;
