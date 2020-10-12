import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Episode extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public season_id: string;

  @column()
  public name: string;

  @column()
  public description: string;

  @column()
  public episode_video: string;

  @column()
  public type_video: string;

  @column()
  public ep_url: string;

  @column()
  public meta_title: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
