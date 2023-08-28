import mongoose from "mongoose";

mongoose.connect("mongodb+srv://carloscandido:carlosteste@cluster0.tahft04.mongodb.net/alura-node");

let db = mongoose.connection;

export default db;