import React, { FunctionComponent, useState, useEffect, createContext } from "react";
import { Client } from "tmi.js";
import { useInput } from "ink";
import StartScreen from "./StartScreen";
import Chat from "./Chat";

interface AppContextInterface {
  setShowStartPage: React.Dispatch<boolean>;
  setChannel: React.Dispatch<string>;
  setUserInputChannelName: React.Dispatch<boolean>;
  client: Client;
}

const AppContext = createContext<AppContextInterface>({} as AppContextInterface);

const App: FunctionComponent = () => {
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
  const [userInputChannelName, setUserInputChannelName] = useState(false);

  useInput(
    (input) => {
      if (input === "q") {
        process.exit();
      }
    },
    { isActive: !userInputChannelName },
  );

  useEffect(() => {
    if (client.readyState() === "CLOSED") {
      client.connect().then(() => {
        console.log("Connecting to the server successfully");
      });
    }
    client.join(channel).catch(() => {
      if (client.getChannels().length > 0) {
        console.log(`Couldn't connect to channel ${channel}`);
      }
    });
  }, [channel]);

  return (
    <AppContext.Provider value={{ setShowStartPage, setChannel, client, setUserInputChannelName }}>
      {showStartPage ? <StartScreen /> : <Chat />}
    </AppContext.Provider>
  );
};

export { App, AppContext };
