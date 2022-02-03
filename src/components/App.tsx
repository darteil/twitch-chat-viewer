import React, { useState, useEffect, createContext } from "react";
import { Client } from "tmi.js";
import { useInput } from "ink";
import StartScreen from "./StartScreen";
import Chat from "./Chat";

type RoomMods = {
  followersOnly: boolean;
  subsOnly: boolean;
  emoteOnly: boolean;
  slow: boolean;
};

interface AppContextInterface {
  setShowStartPage: React.Dispatch<boolean>;
  setChannel: React.Dispatch<string>;
  setEnterChannelNameStatus: React.Dispatch<boolean>;
  client: Client;
  mods: RoomMods;
}

const AppContext = createContext<AppContextInterface>({} as AppContextInterface);

const App: React.FC = () => {
  const [client] = useState(
    new Client({
      options: {
        debug: false,
      },
      connection: { reconnect: true },
      channels: [],
    }),
  );

  const [showStartPage, setShowStartPage] = useState(true);
  const [channel, setChannel] = useState("");
  const [enterChannelNameStatus, setEnterChannelNameStatus] = useState(false);
  const [isConnect, setIsConnect] = useState(false);
  const [roomMods, setRoomMods] = useState<RoomMods>({
    followersOnly: false,
    subsOnly: false,
    emoteOnly: false,
    slow: false,
  });

  useInput(
    (input) => {
      if (input === "q") {
        process.exit();
      }
    },
    { isActive: !enterChannelNameStatus },
  );

  useEffect(() => {
    if (client.readyState() === "CLOSED") {
      client
        .connect()
        .then(() => {
          console.log("Connect to server success");
          setIsConnect(true);
        })
        .catch(() => {
          console.log("Couldn't connect to server");
        });
    }
  }, []);

  useEffect(() => {
    client.join(channel).catch(() => {
      if (client.getChannels().length > 0) {
        console.log(`Couldn't connect to channel ${channel}`);
      }
    });

    client.on("roomstate", (_, state) => {
      const followersOnlyStatus = Number(state["followers-only"]);
      const subsOnlyStatus = Number(state["subs-only"]);
      const emoteOnlyStatus = Number(state["emote-only"]);
      const slowModStatus = Number(state["slow"]);

      const newRoomMods: RoomMods = {
        followersOnly: false,
        subsOnly: false,
        emoteOnly: false,
        slow: false,
      };

      if (followersOnlyStatus >= 0) {
        newRoomMods.followersOnly = true;
      }

      if (subsOnlyStatus > 0) {
        newRoomMods.subsOnly = true;
      }

      if (emoteOnlyStatus > 0) {
        newRoomMods.emoteOnly = true;
      }

      if (slowModStatus) {
        newRoomMods.slow = true;
      }

      setRoomMods(newRoomMods);
    });
  }, [channel]);

  useEffect(() => {
    client.on("followersonly", (_, enabled) => {
      setRoomMods({
        ...roomMods,
        followersOnly: enabled,
      });
    });
    client.on("subscribers", (_, enabled) => {
      setRoomMods({
        ...roomMods,
        subsOnly: enabled,
      });
    });
    client.on("emoteonly", (_, enabled) => {
      setRoomMods({
        ...roomMods,
        emoteOnly: enabled,
      });
    });
    client.on("slowmode", (_, enabled) => {
      setRoomMods({
        ...roomMods,
        slow: enabled,
      });
    });
  }, []);

  return (
    <AppContext.Provider value={{ setShowStartPage, setChannel, client, setEnterChannelNameStatus, mods: roomMods }}>
      {showStartPage ? <StartScreen isConnect={isConnect} /> : <Chat />}
    </AppContext.Provider>
  );
};

export { App, AppContext };
