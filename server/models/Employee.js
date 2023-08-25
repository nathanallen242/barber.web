module.exports = (sequelize, DataTypes) => {
    const Employees = sequelize.define('Employees', {
      employee_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      first_name: { type: DataTypes.STRING, allowNull: false},
      last_name: { type: DataTypes.STRING, allowNull: false},
      phone_number: { type: DataTypes.STRING, allowNull: false},
      email: { type: DataTypes.STRING, allowNull: false},
    }, {
      timestamps: false,
      tableName: 'employees'
    });
  
    Employees.associate = function(models) {
      Employees.hasMany(models.Appointments, { foreignKey: 'employee_id' });
      Employees.hasMany(models.EmployeesSchedule, { foreignKey: 'employee_id' });
    };
  
    return Employees;
  };
  