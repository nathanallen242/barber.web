module.exports = (sequelize, DataTypes) => {
    const Clients = sequelize.define('Clients', {
      client_id:
      { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,
        allowNull: false,
      },
      first_name: { type: DataTypes.STRING, allowNull: false },
      last_name: { type: DataTypes.STRING, allowNull: false },
      phone_number: { type: DataTypes.STRING, allowNull: false },
      client_email: { type: DataTypes.STRING, allowNull: false },
    }, { 
      timestamps: false,
      tableName: 'clients'
    });
  
    Clients.associate = function(models) {
      Clients.hasMany(models.Appointments, { foreignKey: 'client_id' });
    };
  
    return Clients;
  };
  