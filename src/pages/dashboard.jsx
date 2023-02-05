import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import {
  AiOutlineEyeInvisible,
  AiOutlineEye,
  AiOutlineSwapRight,
  AiOutlineSwapLeft,
} from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { FiTrash2, FiEdit } from "react-icons/fi";
import User from "../components/modal/user";
import UpdateUser from "../components/modal/update";
import DeleteModal from "../components/modal/delete";
import Navbar from "../components/navbar";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { API } from "../config/api";

export default function Dashboard() {
  const [showUser, setUser] = useState(false);
  const [showUpdate, setUpdate] = useState(false);
  const [showDelete, setDelete] = useState(false);
  const [itemsPage, setItemPage] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [passwordHide, setPasswordHide] = useState([]);
  const [userDelete, setUserDelete] = useState(0);
  const [userUpdate, setUserUpdate] = useState(0);
  const [search, setSearch] = useState("");

  const isLogin = useSelector((state) => state.userReducers.isLogin);
  const userLogin = useSelector((state) => state.userReducers.user);

  const { data: dataUsers, refetch: refUser } = useQuery("users", async () => {
    const response = await API.get("/users");
    return response.data.data;
  });

  let countUser = dataUsers?.length;

  const itemsPerPage =
    itemsPage === 0
      ? dataUsers?.length
      : itemsPage > dataUsers?.length
      ? dataUsers?.length
      : itemsPage;
  const endOffset = parseInt(itemOffset) + parseInt(itemsPerPage);
  const currentItems = dataUsers?.slice(itemOffset, endOffset);
  const pageCount = dataUsers?.length
    ? Math.ceil(dataUsers?.length / itemsPerPage)
    : 0;

  const passwordView = (string) => {
    let text = string;
    let desc = string.length;
    desc > 10 ? (text = text.substring(0, 15) + "...") : text;
    return text;
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % dataUsers?.length;
    setItemOffset(newOffset);
  };

  const handleItemResult = (e) => {
    setItemPage(e.target.value);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleHide = (id) => {
    let idNow = passwordHide.filter((e) => e === id);
    if (idNow[0] !== id) {
      setPasswordHide([...passwordHide, id]);
    } else {
      setPasswordHide(passwordHide.filter((e) => e !== id));
    }
  };

  const handleDelete = (id) => {
    setDelete(true);
    setUserDelete(id);
  };

  const handleUpdate = (id) => {
    setUserUpdate(id);
    setUpdate(true);
  };

  useEffect(() => {
    isLogin ? null : setPasswordHide([]);
    setTimeout(() => {
      setPasswordHide([]);
    }, 15000);
  }, [passwordHide]);

  useEffect(() => {
    refUser();
  }, []);

  console.log(search);

  return (
    <div>
      <Navbar />
      <div
        className="flex container m-auto mt-12  mb-8 "
        style={{ alignItems: "center" }}
      >
        <div className="grow">
          <h3 className="text-5xl font-bold text-gray-600">Daftar User</h3>
          <p className="mt-1 text-gray-400 text-lg">
            Berikut data user dari tabel user
          </p>
        </div>
        <form className="h-100 p-3">
          <div
            className="flex px-1 border-b-[2px] border-gray-300"
            style={{ alignItems: "center" }}
          >
            <input
              type="text"
              className="py-2 outline-none text-[13pt]"
              placeholder="Search name"
              name="search"
              onChange={handleSearch}
            />
            <BiSearch size={23} className="text-gray-300" />
          </div>
        </form>
        {isLogin ? (
          <div className="h-100 p-3">
            <button
              onClick={() => setUser(true)}
              className="rounded shadow bg-gray-100 px-2 text-gray-500 font-semibold h-10"
            >
              Tambah User
            </button>
          </div>
        ) : null}
      </div>
      <div
        className="flex w-full container m-auto mb-3"
        style={{ alignItems: "center" }}
      >
        <label className="grow text-lg text-gray-600">
          <b>{dataUsers?.length} User </b> result
        </label>
        <select
          className="outline-none text-lg p-1 px-3 border rounded mx-3 border-gray-300 "
          onChange={handleItemResult}
        >
          <option value={countUser}>All</option>
          <option value={countUser < 2 ? countUser : 2}>2</option>
          <option value={countUser < 5 ? countUser : 5}>5</option>
          <option value={countUser < 10 ? countUser : 10}>10</option>
          <option value={countUser < 15 ? countUser : 15}>15</option>
        </select>
      </div>
      <table className="container m-auto w-full rounded-md ">
        <thead className="bg-gray-100 text-gray-400 text-lg font-semibold h-12 shadow">
          <tr>
            <th>No</th>
            <th className=" text-left">ID</th>
            <th className=" text-left">Nama Lengkap</th>
            <th className=" text-left">Username</th>
            <th className=" text-left">Password</th>
            <th className=" text-left">Status</th>
            {isLogin ? <th>Action</th> : null}
          </tr>
        </thead>
        <tbody>
          {currentItems?.map((item, i) => {
            if (!!search === true) {
              if (item.fullname.toLowerCase().includes(search.toLowerCase())) {
                return (
                  <tr key={i} className="border-b-2">
                    <td className="text-center">{i + 1}</td>
                    <td>{item?.id_user}</td>
                    <td>{item?.fullname}</td>
                    <td>{item.username}</td>
                    <td>
                      <div className="flex">
                        {passwordHide.filter((e) => e === i)[0] === i ? (
                          <div className="grow w-full">
                            {passwordView(item.password)}
                          </div>
                        ) : (
                          <div className="grow w-full">******</div>
                        )}

                        {isLogin ? (
                          <button
                            className="mr-4 rounded-full"
                            onClick={() => handleHide(i)}
                          >
                            {passwordHide.filter((e) => e === i)[0] === i ? (
                              <AiOutlineEye size={23} />
                            ) : (
                              <AiOutlineEyeInvisible size={23} />
                            )}
                          </button>
                        ) : null}
                      </div>
                    </td>
                    <td>{item.status}</td>
                    {isLogin ? (
                      <td className="text-center">
                        <button
                          onClick={() => handleUpdate(item.id_user)}
                          className="bg-sky-600 text-white p-2 m-1 rounded"
                        >
                          <FiEdit size={20} />
                        </button>
                        {userLogin.id !== item.id_user ? (
                          <button
                            onClick={() => handleDelete(item.id_user)}
                            className="bg-rose-700 text-white p-2 m-1 rounded"
                          >
                            <FiTrash2 size={20} />
                          </button>
                        ) : null}
                      </td>
                    ) : null}
                  </tr>
                );
              }
            } else {
              return (
                <tr key={i} className="border-b-2">
                  <td className="text-center">{i + 1}</td>
                  <td>{item?.id_user}</td>
                  <td>{item?.fullname}</td>
                  <td>{item.username}</td>
                  <td>
                    <div className="flex">
                      {passwordHide.filter((e) => e === i)[0] === i ? (
                        <div className="grow w-full">
                          {passwordView(item.password)}
                        </div>
                      ) : (
                        <div className="grow w-full">******</div>
                      )}

                      {isLogin ? (
                        <button
                          className="mr-4 rounded-full"
                          onClick={() => handleHide(i)}
                        >
                          {passwordHide.filter((e) => e === i)[0] === i ? (
                            <AiOutlineEye size={23} />
                          ) : (
                            <AiOutlineEyeInvisible size={23} />
                          )}
                        </button>
                      ) : null}
                    </div>
                  </td>
                  <td>{item.status}</td>
                  {isLogin ? (
                    <td className="text-center">
                      <button
                        onClick={() => handleUpdate(item.id_user)}
                        className="bg-sky-600 text-white p-2 m-1 rounded"
                      >
                        <FiEdit size={20} />
                      </button>
                      {userLogin.id !== item.id_user ? (
                        <button
                          onClick={() => handleDelete(item.id_user)}
                          className="bg-rose-700 text-white p-2 m-1 rounded"
                        >
                          <FiTrash2 size={20} />
                        </button>
                      ) : null}
                    </td>
                  ) : null}
                </tr>
              );
            }
          })}
        </tbody>
      </table>
      <div className="container m-auto my-3">
        <ReactPaginate
          breakLabel="..."
          nextLabel={<AiOutlineSwapRight />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel={<AiOutlineSwapLeft />}
          renderOnZeroPageCount={null}
          containerClassName="isolate inline-flex -space-x-px rounded-md shadow-sm"
          previousLinkClassName="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 h-8 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          nextLinkClassName="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 h-8 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          pageLinkClassName="relative inline-flex items-center border border-gray-300 px-5 py-2 text-sm text-muted-500 hover:bg-gray-100 h-8"
          activeClassName="relative inline-flex items-center bg-gray-200 text-sm font-bold text-gray-400 hover:text-gray-600 h-8"
        />
      </div>
      <User show={showUser} showModal={setUser} />
      <UpdateUser show={showUpdate} showModal={setUpdate} data={userUpdate} />
      <DeleteModal
        show={showDelete}
        showModal={setDelete}
        iduser={userDelete}
      />
    </div>
  );
}
