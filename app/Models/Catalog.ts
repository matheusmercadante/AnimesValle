import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  hasMany,
  HasMany,
  ManyToMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Genre from "./Genre";
import Season from "./Season";
import Review from "./Review";

export default class Catalog extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @manyToMany(() => Genre, {
    pivotTable: "catalog_genre",
    localKey: "id",
    pivotForeignKey: "catalog_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "genre_id",
  })
  public genres: ManyToMany<typeof Genre>;

  @hasMany(() => Season, {
    localKey: "id",
    foreignKey: "catalog_id",
  })
  public seasons: HasMany<typeof Season>;

  @hasMany(() => Review, {
    localKey: "id",
    foreignKey: "catalog_id",
  })
  public reviews: HasMany<typeof Review>;

  @column()
  public name: string;

  @column()
  public description: string;

  @column()
  public release_year: string;

  @column()
  public quality: string;

  @column()
  public author: string;

  @column()
  public country: string;

  @column()
  public main_image: string;

  @column()
  public type_image: string;

  @column()
  public published: string;

  @column()
  public qtd_seasons: string;

  @column()
  public url: string;

  @column()
  public meta_title: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
