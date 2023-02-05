import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import { setAuthToken } from "./config/api";
import Dashboard from "./pages/dashboard";

function App() {
  const state = useSelector((state) => state.userReducers);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    if (state.isLogin === false) {
      console.log("Terimakasih telah menggunakan aplikasi ini");
    }
  }, [state]);
  return (
    <>
      <Dashboard />
    </>
  );
}

export default App;
