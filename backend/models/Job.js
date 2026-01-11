const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Job = sequelize.define('Job', {
  taskName: { type: DataTypes.STRING, allowNull: false },
  payload: { type: DataTypes.JSON },
  priority: { type: DataTypes.ENUM('Low','Medium','High'), defaultValue: 'Medium' },
  status: { type: DataTypes.ENUM('pending','running','completed'), defaultValue: 'pending' }
}, { timestamps: true });

module.exports = Job;
    