import { DataTypes, Model } from 'sequelize';
import db from '.';

class DeviceModel extends Model {
  declare id: number;

  declare version: string;

  declare tags: string;

  declare createdAt: Date;

  declare updatedAt: Date;
}

DeviceModel.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  version: { type: DataTypes.STRING, allowNull: false },
  tags: { type: DataTypes.STRING, allowNull: false },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: db,
  modelName: 'DeviceModel',
  timestamps: true,
  underscored: true,
  tableName: 'devices',
});

export default DeviceModel;
