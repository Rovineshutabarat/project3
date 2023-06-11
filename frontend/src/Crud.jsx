import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const Crud = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [nim, setNim] = useState("");
  const [email, setEmail] = useState("");
  const [kelas, setKelas] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/data");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://localhost:3000/data/${editData._id}`, {
          name,
          nim,
          email,
          kelas,
        });
        setEditMode(false);
        setEditData(null);
      } else {
        await axios.post("http://localhost:3000/data", {
          name,
          nim,
          email,
          kelas,
        });
      }
      setName("");
      setNim("");
      setEmail("");
      setKelas("");
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/data/${id}`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (item) => {
    setEditMode(true);
    setEditData(item);
    setName(item.name);
    setNim(item.nim);
    setEmail(item.email);
    setKelas(item.kelas);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full mx-32 mt-5">
        <div className="text-center">
          <h1 className="text-3xl font-medium">UAS Design Web</h1>
          <p className="text-2xl">Haekalsah Batubara</p>
        </div>
        <div className="p-5 mt-5 bg-white rounded-md shadow-lg">
          <div className="flex flex-col mt-3 gap-y-2">
            <p className="px-5 py-3 font-medium text-white bg-green-500">
              {editMode ? "Edit Form" : "Input Form"}
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
              <label>Nama</label>
              <input
                type="text"
                placeholder="Masukkan Nama"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-3 py-1 rounded-md outline-2 outline-slate-300 outline"
              />
              <label>Nim</label>
              <input
                type="text"
                placeholder="Masukkan Nim"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                className="px-3 py-1 rounded-md outline-2 outline-slate-300 outline"
              />
              <label>Email</label>
              <input
                type="text"
                placeholder="Masukkan Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-1 rounded-md outline-2 outline-slate-300 outline"
              />
              <label>Kelas</label>
              <input
                type="text"
                placeholder="Masukkan Kelas"
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
                className="px-3 py-1 rounded-md outline-2 outline-slate-300 outline"
              />

              <div className="mt-5">
                <button
                  type="submit"
                  className="px-3 py-1 text-white bg-green-500 rounded outline"
                >
                  {editMode ? "Update" : "Tambah"}
                </button>
                {editMode && (
                  <button
                    className="px-3 py-1 ml-2 text-white bg-red-500 rounded"
                    onClick={() => {
                      setEditMode(false);
                      setEditData(null);
                      setName("");
                      setNim("");
                      setEmail("");
                      setKelas("");
                    }}
                  >
                    Batal
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="p-5 mt-5 mb-10 bg-white rounded-md shadow-lg">
          <div className="flex flex-col mt-3 gap-y-2">
            <table className="min-w-full">
              <thead className="text-xs text-center text-white bg-slate-800">
                <tr className="text-center">
                  <th className="p-4">No</th>
                  <th>Nama</th>
                  <th>Nim</th>
                  <th>Email</th>
                  <th>Kelas</th>
                  <th className="">Actions</th>
                </tr>
              </thead>
              <tbody className="mt-5">
                {data.map((item, index) => (
                  <tr key={item._id} className="text-center">
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.nim}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.kelas}
                    </td>
                    <td className="flex items-center justify-center mt-5 space-x-2">
                      <img
                        src="https://img.icons8.com/sf-black-filled/64/FFFFFF/edit.png"
                        alt="Tombol Edit Data"
                        className="w-10 h-10 p-1 bg-green-500 rounded-md cursor-pointer"
                        onClick={() => handleEdit(item)}
                      />
                      <img
                        src="https://img.icons8.com/glyph-neue/256/FFFFFF/trash.png"
                        alt="Tombol Hapus Data"
                        className="w-10 h-10 p-1 bg-red-500 rounded-md cursor-pointer"
                        onClick={() => handleDelete(item._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crud;
