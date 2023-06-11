import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Data from "./model/dataModel.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/data", async (req, res) => { 
  try {
    const data = await Data.find({});
    res.status(200).json(data); 
  } catch (error) {
    console.log(error);
  }
});

app.put("/data/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Data.findByIdAndUpdate(id, req.body);
    if (!data) {
      return res.status(404).json({ message: "Data TIdak Ditemukan" });
    }
    const updatedData = await Data.findById(id);
    res.status(200).json(updatedData);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/data/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Data.findByIdAndDelete(id);
    if (!data) {
      res.status(404).json({ message: "Data Tidak Ditemukan" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
});

app.post("/data", async (req, res) => {
  try {
    const data = await Data.create(req.body);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
});

mongoose
  .connect(
    "mongodb+srv://rovineshutabarat23:rovinbarat2310@dbmahasiswa.mgh0ko1.mongodb.net/Botak?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected");
    app.listen(3000, () => {
      try {
        console.log("Server is Running");
      } catch (error) {
        console.log(error);
      }
    });
  })
  .catch((error) => {
    console.log(error);
  });
