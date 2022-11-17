import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "customers",
  timestamps: false,
})
export default class CustomerModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare street: string;

  @Column({ allowNull: false, field: "street_number" })
  declare streetNumber: string;

  @Column({ allowNull: false, field: "zip_code" })
  declare zipCode: string;

  @Column({ allowNull: false })
  declare city: string;

  @Column({ allowNull: false })
  declare state: string;

  @Column({ allowNull: true })
  declare complement: string;

  @Column({ allowNull: false })
  declare district: string;

  @Column({ allowNull: false })
  declare active: boolean;

  @Column({ allowNull: false, field: "reward_points" })
  declare rewardPoints: number;
}
