import { sequelize } from "../config/sequelize.config.js";
import { DataTypes, Model  } from "sequelize";

class ProductModel extends Model{}

ProductModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    disc: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rating: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    categoryId: {
        type: DataTypes.STRING,
        allowNull: true,
        onDelete: 'cascade'
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },    
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'products',
    freezeTableName: true
})

export default ProductModel