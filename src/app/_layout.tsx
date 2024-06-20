import { app } from "@/main";
import { Stack } from "expo-router";

import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <Provider store={app.store}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Museum",
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </Provider>
  );
}
