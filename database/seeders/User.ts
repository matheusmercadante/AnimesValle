import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    await User.createMany([
      {
        isAdmin: true,
        username: 'Haungi',
        email: 'matheusmercadante2002@gmail.com',
        password: 'Matheus123',
      },
    ])
  }
}
