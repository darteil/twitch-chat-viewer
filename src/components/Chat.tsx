import React, { FC, useContext, useState } from "react";
import MessagesList from "./MessagesList";
import RoomState from "./RoomState";
import { AppContext } from "./App";
import { useInput } from "ink";

const Chat: FC = () => {
  const { client } = useContext(AppContext);
  const [showMods, setShowMods] = useState(false);

  useInput((input) => {
    if (input === "m") setShowMods(!showMods);
  });

  return (
    <>
      <MessagesList client={client} />
      {showMods && <RoomState client={client} />}
    </>
  );
};

export default Chat;
