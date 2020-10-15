import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User';
import Catalog from './Catalog';

export default class Review extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: string;

  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>

  @column()
  public catalog_id: string;

  @belongsTo(() => Catalog, {
    localKey: 'id',
    foreignKey: 'catalog_id',
  })
  public catalog: BelongsTo<typeof Catalog>

  @column()
  public title: string;

  @column()
  public description: string;

  @column()
  public rating: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
