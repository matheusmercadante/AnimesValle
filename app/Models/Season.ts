import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Episode from "./Episode";

export default class Season extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @hasMany(() => Episode, {
    localKey: "id",
    foreignKey: "season_id",
  })
  public episodes: HasMany<typeof Episode>;

  @column()
  public catalog_id: string;

  @column()
  public name: string;

  @column()
  public main_image: string;

  @column()
  public type_image: string;

  @column()
  public published: string;

  @column()
  public qtd_episodes: string;

  @column()
  public url: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
