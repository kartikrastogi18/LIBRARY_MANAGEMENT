import express from "express";
import pg from "pg";
import  sequelize  from "./db.js"; 
import authRoutes from "./routes/user-routes.js" 
import bookRoutes from "./routes/book-routes.js" 

const app = express();
app.use(express.json());


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

app.listen(3000, () => console.log("Server running on http://localhost:3000"));