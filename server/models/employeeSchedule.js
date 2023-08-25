module.exports = (sequelize, DataTypes) => {
    const EmployeesSchedule = sequelize.define('EmployeesSchedule', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      employee_id:{ type: DataTypes.INTEGER, allowNull: false},
      day_id: { type: DataTypes.INTEGER, allowNull: false},
      from_hour: { type: DataTypes.TIME, allowNull: false},
      to_hour: { type: DataTypes.TIME, allowNull: false},
    }, {
      timestamps: false,
      tableName: 'employees_schedule'
    });
  
    EmployeesSchedule.associate = function(models) {
      EmployeesSchedule.belongsTo(models.Employees, { foreignKey: 'employee_id' });
    };
  
    return EmployeesSchedule;
  };
  