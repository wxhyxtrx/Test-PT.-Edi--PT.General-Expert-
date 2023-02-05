import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { API } from "../../config/api";
import { useQuery } from "react-query";

export default function UpdateUser({ show, showModal, data }) {
  const handleClose = () => {
    showModal(false);
    setForm({
      username: "",
      fullname: "",
      password: "",
      status: "",
    });
  };

  const [typePassword, setTypePassword] = useState("password");
  const [form, setForm] = useState({
    username: "",
    fullname: "",
    password: "",
    status: "",
  });
  const { username, fullname, password, status } = form;

  const {
    data: dataUpdateUser,
    refetch: refUpdateUser,
    isLoading: loadingDataUpdate,
  } = useQuery("userUpdate", async () => {
    const response = await API.get("/user/" + data);
    return response.data.data;
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const togglePassword = (e) => {
    e.preventDefault;
    typePassword === "password"
      ? setTypePassword("text")
      : setTypePassword("password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await API.patch(`/user/${dataUpdateUser.id_user}`, form);
    if (response.data.code === 200) {
      handleClose();
      alert("Data berhasil dirubah");
    } else {
      alert("Failed!");
    }
  };

  refUpdateUser();
  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 mb-3"
                  >
                    <label className="text-2xl">Update User</label>
                    <p className="text-sm font-normal text-gray-400">
                      Perhatikan data dengan baik
                    </p>
                  </Dialog.Title>
                  {loadingDataUpdate ? (
                    <> Please wait , Loading... </>
                  ) : (
                    <form onSubmit={(e) => handleSubmit(e)}>
                      <input
                        className="w-full p-2 border rounded my-1 outline-none"
                        type={"text"}
                        placeholder="Nama lengkap"
                        name="fullname"
                        value={
                          fullname === "" ? dataUpdateUser?.fullname : fullname
                        }
                        onChange={handleChange}
                      />
                      <input
                        className="w-full p-2 border rounded my-1 outline-none"
                        type={"text"}
                        placeholder="Username"
                        name="username"
                        value={
                          username === "" ? dataUpdateUser?.username : username
                        }
                        onChange={handleChange}
                      />
                      <div className="flex w-full p-2 border rounded my-1 outline-none">
                        <input
                          className="grow outline-none"
                          type={typePassword}
                          placeholder="Password"
                          name="password"
                          value={password}
                          onChange={handleChange}
                        />
                        <label
                          className="text-gray-500"
                          onClick={(e) => togglePassword(e)}
                        >
                          {typePassword === "password" ? (
                            <AiOutlineEyeInvisible size={23} />
                          ) : (
                            <AiOutlineEye size={23} />
                          )}
                        </label>
                      </div>
                      <input
                        className="w-full p-2 border rounded my-1 outline-none"
                        type={"text"}
                        placeholder="Status"
                        name="status"
                        value={status === "" ? dataUpdateUser?.status : status}
                        onChange={handleChange}
                      />
                      <button
                        type="submit"
                        className="float-right w-48 bg-lime-500 mt-5 hover:bg-lime-600 rounded-md hover:transition-all text-white p-2"
                      >
                        Update
                      </button>
                    </form>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
