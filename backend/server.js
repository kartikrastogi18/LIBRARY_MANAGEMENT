import express from "express";
import pg from "pg";
import sequelize from "./db.js";
import authRoutes from "./routes/user-routes.js";
import bookRoutes from "./routes/book-routes.js";
import cartRoutes from "./routes/cart-routes.js";
import cors from "cors";

import Cart from "./models/cart.js";
import { canTreatArrayAsAnd } from "sequelize/lib/utils";
import libraryRoutes from "./routes/library-routes.js";


const app = express();
app.use(express.json());
// import cors from "cors";

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// app.use(
  //   cors({
    //     origin: [
      //       "http://127.0.0.1:8080", // live-server default
      //       "http://localhost:8080", // sometimes browser converts 127.0.0.1 → localhost
//       "http://127.0.0.1:5500", // (optional) if you use serve on port 5500
//       "http://localhost:5500",
//       "https://library-management-psi-beryl.vercel.app",
//     ],
//     methods: "GET,POST,PUT,DELETE",
//   allowedHeaders: "Content-Type,Authorization"
//     // credentials: true,
//   })
// );


// test route
app.use("/auth", authRoutes);
app.use("/", bookRoutes);
app.use("/cart", cartRoutes);
app.use("/library", libraryRoutes);
app.get("/", async (req, res) => {
  try {
    res.json({ message: "PostgreSQL connected!" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error connecting to DB");
  }
});
// app.use(express.json());

await sequelize.authenticate();
await sequelize.sync({ alter: true });



app.listen(5000, () => console.log("Server running on http://localhost:5000"));
