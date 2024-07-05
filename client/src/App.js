import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Singup";
import Login from "./pages/Login"
import Chat from "./pages/Chat";
import Voice from "./pages/Voice";
import "./App.css"
import Submit from "./pages/Submit";
import Profie from "./pages/Profie";
import ChatList from "./pages/ChatList";

function App() {	


	return (
		<Routes>
			<Route path="login" exact element={<Login />} />
			<Route path="/chatList" exact element={<ChatList />} />
		</Routes>
	);
}

export default App;
