import express from "express";
import pg from "pg";
import  sequelize  from "./db.js"; 
import authRoutes from "./routes/user-routes.js" 
import bookRoutes from "./routes/book-routes.js" 
import cors from "cors";


const app = express();
app.use(express.json());
app.use(cors({
  origin: [
    "http://127.0.0.1:8080",   // live-server default
    "http://localhost:8080",   // sometimes browser converts 127.0.0.1 → localhost
    "http://127.0.0.1:5500",   // (optional) if you use serve on port 5500
    "http://localhost:5500",
    "https://library-management-psi-beryl.vercel.app"
  ],
  credentials: true
}));


await sequelize.authenticate()
await sequelize.sync({alter:true})

// test route
app.use("/auth",authRoutes);
app.use("/",bookRoutes);
app.get("/", async (req, res) => {
  try {
    
    res.json({ message: "PostgreSQL connected!" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error connecting to DB");
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));