import sequelize from "../db.js";
import { DataTypes } from "sequelize";
const User =sequelize.define("User",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    is_admin:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
   
    created_at:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    },
    updated_at:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    },
}) 
export default User