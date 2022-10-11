import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./hooks/navigation";

//used for store some cache data token or something like asyncStorage in rn ,
import * as SecureStore from "expo-secure-store";
//nhost client for communicate with graph QL Api
import { NhostClient, NhostReactProvider } from "@nhost/react";

window = undefined;

//nhost client
//create an instance of the nhclient that take an object as a prameter
//on this object we specify the backend url, the client storge type (only in mobile apps not in browser)

const nhost = new NhostClient({
  backendUrl: "https://cubokkyhvyvqykwbcawu.nhost.run",
  clientStorageType: "expo-secure-storage",
  clientStorage: SecureStore,
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      //all ower screen are now able to use some hooks provided by NhostReactProvider to get access to the nhost client that we set
      <NhostReactProvider nhost={nhost}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </NhostReactProvider>
    );
  }
}
