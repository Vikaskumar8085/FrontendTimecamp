import {createRoot} from "react-dom/client";
import App from "./App.jsx";
import "./style/Global.scss";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import store from "./redux/store.js";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="189595369066-lk3ped7489jrnlmt471ij31plt6eso29.apps.googleusercontent.com">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </Provider>
);
