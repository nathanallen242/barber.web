module.exports = (sequelize, DataTypes) => {
    const ServiceCategories = sequelize.define('ServiceCategories', {
      category_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      category_name: { type: DataTypes.STRING, allowNull: false },
    }, {
      timestamps: false,
      tableName: 'service_categories'
    });
  
    ServiceCategories.associate = function(models) {
      ServiceCategories.hasMany(models.Services, { foreignKey: 'category_id' });
    };
  
    return ServiceCategories;
  };
  