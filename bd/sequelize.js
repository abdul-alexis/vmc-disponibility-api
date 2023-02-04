const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
           
          key: fs.readFileSync( path.join(__dirname, '..', 'certs', 'client-key.pem')),
          cert:fs.readFileSync( path.join(__dirname, '..', 'certs', 'client-cert.pem')),
          ca:  fs.readFileSync( path.join(__dirname, '..', 'certs', 'server-ca.pem'))
        }
      },
    pool: {
        max: 50,
        min: 0,
        acquire: 1200000,
        idle: 1000000,
    }
});

(async () => {
    try {

        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        // await sequelize.sync({ alter: true });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

//modelo Usuario
const Event = sequelize.define('events', {
    // Model attributes are defined here
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true

    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true

    },
}, {
    freezeTableName: true
    // Other model options go here
});

const User = sequelize.define('users', {
    name: {
        type:DataTypes.STRING,
        allowNull: true
    },
    email: {
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    isAdmin:{
        type:DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:false,
    },
    hash: {
        type:DataTypes.STRING,
        allowNull: false
    },
  });

module.exports = {User, Event, sequelize };
