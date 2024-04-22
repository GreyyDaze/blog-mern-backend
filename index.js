require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const postRoutes = require("./routes/post");
const websiteRoutes = require("./routes/website");

const morgan = require("morgan");

const app = express();
const http = require("http").createServer(app);

// db connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

// middlewares
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// route middlewares
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", postRoutes);
app.use("/api", websiteRoutes);


const port = process.env.PORT || 8000;

http.listen(port, () => console.log("Server running on port 8000"));



// const bcrypt = require('bcrypt');

// // Function to hash a password
// const hashPassword = (password) => {
//   return new Promise((resolve, reject) => {
//     bcrypt.genSalt(12, (err, salt) => {
//       if (err) {
//         reject(err);
//       }
//       bcrypt.hash(password, salt, (err, hash) => {
//         if (err) {
//           reject(err);
//         }
//         resolve(hash);
//       });
//     });
//   });
// };

// // Sample passwords to hash
// const passwords = [
//   "hashedpasswordMNO",
//   "hashedpassword123",
//   "hashedpassword456",
//   "hashedpassword789",
//   "hashedpasswordABC",
//   "hashedpasswordDEF",
//   "hashedpasswordGHI",
//   "hashedpasswordJKL",
//   "hashedpasswordPQR",
//   "hashedpasswordSTU",
//   "hashedpasswordVWX",
//   "hashedpasswordYZ"
// ];

// // Hashing passwords
// const hashedPasswords = passwords.map(async (password) => {
//   try {
//     const hashedPassword = await hashPassword(password);
//     return hashedPassword;
//   } catch (error) {
//     console.error("Error hashing password:", error);
//     return null;
//   }
// });

// Promise.all(hashedPasswords)
//   .then((results) => {
//     console.log("Hashed passwords:");
//     console.log(results);
//   })
//   .catch((error) => {
//     console.error("Error hashing passwords:", error);
//   });

