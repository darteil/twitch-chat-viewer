import React, { FC, useContext } from "react";
import { config } from "../config";
import MessagesList from "./MessagesList";
import RoomState from "./RoomState";
import { AppContext } from "./App";

const Chat: FC = () => {
  const { client } = useContext(AppContext);

  return (
    <>
      <MessagesList client={client} config={config} />
      {config.showMods && <RoomState client={client} />}
    </>
  );
};

export default Chat;
