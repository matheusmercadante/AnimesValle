import { DateTime } from "luxon";
import { BaseModel, column, ManyToMany, manyToMany } from "@ioc:Adonis/Lucid/Orm";
import Catalog from "./Catalog";

export default class Genre extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @manyToMany(() => Catalog, {
    pivotTable: "catalog_genre",
    localKey: "id",
    pivotForeignKey: "genre_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "catalog_id",
  })
  public genres: ManyToMany<typeof Catalog>;

  @column()
  public name: string;

  @column()
  public url: string;

  @column()
  public meta_title: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
