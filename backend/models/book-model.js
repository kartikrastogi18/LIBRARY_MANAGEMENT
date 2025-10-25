import sequelize from "../db.js";
import { DataTypes } from "sequelize";
const Book=sequelize.define("Book",{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    author_name:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    author_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    language:{
        type:DataTypes.STRING,
        allowNull:false
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
    },
    published_on:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
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
export default Book 