import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class CatalogGenre extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public genre_id: string;

  @column()
  public anime_id: string;
}
