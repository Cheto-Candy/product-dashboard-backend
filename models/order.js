module.exports = (sequelize, DataTypes) => {

  const Order = sequelize.define("Order", {

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },

    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  });

  Order.associate = (models) => {
    Order.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product"
    });
  };

  return Order;
};