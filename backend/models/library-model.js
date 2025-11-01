import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import User from "./user-model.js";
import Book from "./book-model.js";        
 const Library=sequelize.define("library",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    user_id:{
        type:DataTypes.INTEGER,allowNull:false
    },
    book_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    purchased_at:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    },
 });
User.hasMany(Library, { foreignKey: "user_id" });
Book.hasMany(Library, { foreignKey: "book_id" });
Library.belongsTo(User, { foreignKey: "user_id" });
Library.belongsTo(Book, { foreignKey: "book_id" });

export default Library;