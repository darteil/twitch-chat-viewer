import React, { useContext, useState } from "react";
import MessagesList from "./MessagesList/index.js";
import RoomState from "./RoomState.js";
import { AppContext } from "./App.js";
import { useInput } from "ink";

const Chat = () => {
  const { client } = useContext(AppContext);
  const [showMods, setShowMods] = useState(false);

  useInput((input) => {
    if (input === "m") setShowMods(!showMods);
  });

  return (
    <>
      <MessagesList client={client} />
      {showMods && <RoomState />}
    </>
  );
};

export default Chat;
