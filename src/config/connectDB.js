const mongoose = require("mongoose");

const connectDB = async () => {
 await mongoose.connect(
    "mongodb+srv://namastedev:5xqXb2NzXDJTDrMD@namastenodejs.s0stkp0.mongodb.net/devTinder"
  );
};

module.exports = connectDB;

