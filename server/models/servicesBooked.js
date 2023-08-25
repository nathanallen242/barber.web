module.exports = (sequelize, DataTypes) => {
  const ServicesBooked = sequelize.define('ServicesBooked', {
    appointment_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    service_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
  }, {
    timestamps: false,
    tableName: 'services_booked'
  });

  ServicesBooked.associate = (models) => {
    ServicesBooked.belongsTo(models.Appointments, { foreignKey: 'appointment_id' });
    ServicesBooked.belongsTo(models.Services, { foreignKey: 'service_id' });
  };

  return ServicesBooked;
};
