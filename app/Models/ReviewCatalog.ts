import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ReviewCatalog extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public catalog_id: string;

  @column()
  public review_id: string;
}
