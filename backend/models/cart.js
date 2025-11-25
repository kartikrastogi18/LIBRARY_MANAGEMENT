import sequelize from "../db.js";
import { DataTypes } from "sequelize";
import User from "./user-model.js";
import Book from "./book-model.js";
const Cart = sequelize.define("cart",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:User,
            key:"id"
        }
    },
    book_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:  Book,
            key:"id"
        }
    },
    quantity:{
        type:DataTypes.INTEGER,
        defaultValue:1
    },
    is_Purchased:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    
        // timestamps: true
    
    
})
User.hasMany(Cart, { foreignKey: "user_id" });
Book.hasMany(Cart, { foreignKey: "book_id" });
Cart.belongsTo(User, { foreignKey: "user_id" });
Cart.belongsTo(Book, { foreignKey: "book_id" });

export default Cart;
