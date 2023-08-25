module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('Admin', {
      admin_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      tableName: 'barber_admin'
    });
  
    return Admin;
  };
  
  
  
  
  
  
  