import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useMutation } from "react-query";
import { API } from "../../config/api";

export default function User({ show, showModal }) {
  const handleClose = () => showModal(false);
  const [typePassword, setTypePassword] = useState("password");
  const [form, setForm] = useState({
    username: "",
    fullname: "",
    password: "",
    status: "",
  });
  const { username, fullname, password, status } = form;

  const togglePassword = (e) => {
    e.preventDefault;
    typePassword === "password"
      ? setTypePassword("text")
      : setTypePassword("password");
  };

  const handleChange = (e) => {
    console.log(username);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const requestBody = JSON.stringify(form);
      const response = await API.post("/user", requestBody, config);
      if (response.data.code === 200) {
        alert("Data berhasil ditambahkan");
        setForm({
          username: "",
          fullname: "",
          password: "",
          status: "",
        });
        handleClose();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Username is Already!");
    }
  });

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
                    <label className="text-2xl">Tambah User</label>
                    <p className="text-sm font-normal text-gray-400">
                      Masukkan data dengan teliti
                    </p>
                  </Dialog.Title>
                  <form onSubmit={(e) => handleSubmit.mutate(e)}>
                    <input
                      className="w-full p-2 border rounded my-1 outline-none"
                      type={"text"}
                      placeholder="Nama lengkap"
                      name="fullname"
                      value={fullname}
                      onChange={handleChange}
                    />
                    <input
                      className="w-full p-2 border rounded my-1 outline-none"
                      type={"text"}
                      placeholder="Username"
                      name="username"
                      value={username}
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
                      value={status}
                      onChange={handleChange}
                    />
                    <button
                      type="submit"
                      className="float-right w-48 bg-lime-500 mt-5 hover:bg-lime-600 rounded-md hover:transition-all text-white p-2"
                    >
                      Tambahkan
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
