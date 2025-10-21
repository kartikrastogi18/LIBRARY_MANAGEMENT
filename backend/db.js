import {Sequelize} from "sequelize"
 const sequelize = new Sequelize("postgres","postgres","hD4k#6yQ",{
    host:"localhost",
    dialect:"postgres",
    logging:false
})
export default sequelize;