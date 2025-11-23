// import { Sequelize } from "sequelize";

// const sequelize = new Sequelize(
//   "library_management_quw4", // database name
//   "library_management_quw4_user", // username
//   "9jSSX1mtEUfGVeNAbWqX3eHBfeHZu9R0", // password
//   {
//     host: "dpg-d3urkhodl3ps73fbnqq0-a.oregon-postgres.render.com",
//     port: 5432,
//     dialect: "postgres",
//     logging: false,
//     dialectOptions: {
//       ssl: {
//         require: true,              // ✅ Render requires SSL
//         rejectUnauthorized: false,  // ✅ Bypass self-signed certificate issues
//       },
//     },
//   }
// );

// export default sequelize;
import {Sequelize} from "sequelize"
 const sequelize = new Sequelize("lms","postgres","hD4k#6yQ",{
    host:"localhost",
    dialect:"postgres",
    logging:false
})
sequelize.authenticate()
    .then(() => {
        console.log("Connection to the database has been established successfully.");
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });

export default sequelize;