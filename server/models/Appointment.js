module.exports = (sequelize, DataTypes) => {
    const Appointments = sequelize.define('Appointments', {
      appointment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      date_created: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_time_expected: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      canceled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      cancellation_reason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    }, {
      tableName: 'appointments'
    });
  
    Appointments.associate = (models) => {
      Appointments.belongsTo(models.Clients, { foreignKey: 'client_id' });
      Appointments.belongsTo(models.Employees, { foreignKey: 'employee_id' });
      Appointments.belongsToMany(models.Services, { through: models.ServicesBooked, foreignKey: 'appointment_id' });
    };
  
    return Appointments;
  };
  