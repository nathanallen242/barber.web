module.exports = (sequelize, DataTypes) => {
    const Services = sequelize.define('Services', {
      service_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      service_name: { type: DataTypes.STRING, allowNull: false },
      service_description:{ type: DataTypes.STRING, allowNull: false },
      service_price: { type: DataTypes.DECIMAL, allowNull: false },
      service_duration: { type: DataTypes.INTEGER, allowNull: false },
      category_id: { type: DataTypes.INTEGER, allowNull: false },
    }, {
      timestamps: false,
      tableName: 'services'
    });
  
    Services.associate = function(models) {
      Services.belongsTo(models.ServiceCategories, { foreignKey: 'category_id' });
      Services.belongsToMany(models.Appointments, { through: models.ServicesBooked, foreignKey: 'service_id' });
    };
  
    return Services;
  };
  