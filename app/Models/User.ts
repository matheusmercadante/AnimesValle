import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Review from './Review';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => Review, {
    localKey: "id",
    foreignKey: "user_id",
  })
  public reviews: HasMany<typeof Review>;

  @column()
  public username: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public isAdmin: boolean

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
