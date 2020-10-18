import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User';
import Catalog from './Catalog';

export default class Review extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>

  @manyToMany(() => Catalog, {
    pivotTable: "review_catalog",
    localKey: "id",
    pivotForeignKey: "review_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "catalog_id",
    pivotColumns: ['rating']
  })
  public catalog: ManyToMany<typeof Catalog>

  @column()
  public title: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
