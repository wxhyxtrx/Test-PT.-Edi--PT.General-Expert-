import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import { useDispatch } from "react-redux";
import { LoginAction } from "../../store/action/userAction";

export default function Login({ show, showModal }) {
  const dispatch = useDispatch();
  const handleClose = () => showModal(false);

  const [typePassword, setTypePassword] = useState("password");
  const togglePassword = (e) => {
    e.preventDefault;
    typePassword === "password"
      ? setTypePassword("text")
      : setTypePassword("password");
  };

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/login", form);
      dispatch(LoginAction(response.data.data));
    } catch (err) {
      console.log(err);
      alert("Username atau Password Salah");
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="leading-6 text-gray-900">
                    <label className="text-2xl font-bold">Wellcome</label>
                  </Dialog.Title>
                  <p className="text-sm inline-flex justify-center">
                    Silakan login terlebih dahulu
                  </p>
                  <form
                    className="mt-3"
                    onSubmit={(e) => handleSubmit.mutate(e)}
                  >
                    <input
                      className="w-full p-2 border rounded my-1 outline-none"
                      type={"text"}
                      name="username"
                      onChange={handleChange}
                      placeholder="Username"
                    />
                    <div className="flex w-full p-2 border rounded my-1 outline-none">
                      <input
                        className="grow outline-none"
                        type={typePassword}
                        placeholder="Password"
                        name="password"
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

                    <div className="mt-4">
                      <button
                        type="submit"
                        className="w-32 float-right inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-gray-300 focus:outline-none focus-visible:ring-2"
                        onClick={handleClose}
                      >
                        Login
                      </button>
                    </div>
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
