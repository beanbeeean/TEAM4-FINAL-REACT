import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { store } from "./redux/store";
import { Provider, useSelector } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import Authorization from "./authorization/Authorization";

function App() {
  const persistor = persistStore(store);

  var useConsole = false;

  if (!useConsole) {
    console = {};
    console.log = function () {};
    console.warn = function () {};
    console.error = function () {};
  }

  return (
    <div id="wrap">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Authorization />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
