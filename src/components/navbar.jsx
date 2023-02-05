import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../config/api";
import { LoginAction, LogoutAction } from "../store/action/userAction";
import Login from "./auth/login";

export default function Navbar() {
  const [showModal, setModal] = useState(false);

  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.userReducers.isLogin);
  const userLogin = useSelector((state) => state.userReducers.user);

  const checkUser = async () => {
    try {
      const response = await API.get("/checkauth", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      if (response.status === 404) {
        return dispatch(
          LogoutAction({
            type: "LOGOUT",
          })
        );
      }
      let payload = response.data.data;
      payload.token = localStorage.token;
      dispatch(LoginAction(payload));
    } catch (error) {
      console.log("Error Auth =>", error);
    }
  };

  const handleLogout = () => {
    dispatch(
      LogoutAction({
        type: "LOGOUT",
      })
    );
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div>
      <nav className="bg-whiteh-12 shadow flex bg-gray-50">
        <ul className="flex h-100 items-center grow">
          {isLogin ? (
            <li className="h-100  border-solid border-b-4 border-gray-500 p-3 mx-2 text-gray-500 cursor-pointer font-semibold ">
              Hello {userLogin.fullname}
            </li>
          ) : (
            <li className="h-100  p-3 mx-2 text-gray-500 cursor-pointer font-semibold ">
              Hi, Selamat datang
            </li>
          )}
        </ul>
        {isLogin ? (
          <button
            className="mx-10 text-gray-600 font-semibold"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        ) : (
          <button
            className="mx-10 text-gray-600 font-semibold"
            onClick={() => setModal(true)}
          >
            Login
          </button>
        )}
      </nav>
      <Login show={showModal} showModal={setModal} />
    </div>
  );
}
