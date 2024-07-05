import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { UserProvider } from "./context/UserContext";




   ReactDOM.render(

<React.StrictMode>
	<UserProvider>
	<BrowserRouter>

		<App />

	</BrowserRouter>
	</UserProvider>
</React.StrictMode>,

	document.getElementById("root")
  );
  