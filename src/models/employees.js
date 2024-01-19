const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Import the Sequelize instance

const Employee = sequelize.define('Employee', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: true,
        },
    },
    date_of_birth: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true,
        },
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
        },
    },
    salary: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            isFloat: true,
        },
    },
});

module.exports = Employee;
