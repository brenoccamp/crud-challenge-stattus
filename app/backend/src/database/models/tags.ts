import { DataTypes, Model } from 'sequelize';
import db from '.';

class StoresModel extends Model {
  declare id: number;

  declare name: string;

  declare color: string;

  declare createdAt: Date;

  declare updatedAt: Date;
}

StoresModel.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  color: { type: DataTypes.STRING, allowNull: false },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: db,
  modelName: 'TagModel',
  timestamps: true,
  underscored: true,
  tableName: 'tags',
});

export default StoresModel;
