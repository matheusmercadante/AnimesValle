import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class UsersController {
  public async index ({ view, auth }: HttpContextContract) {
    const limit = 10;
    const users = await User.query().paginate(1, limit);
    const user = await auth.authenticate();

    return view.render("admin/users/index", { users, user });
  }

  public async create (ctx: HttpContextContract) {
  }

  public async store (ctx: HttpContextContract) {
  }

  public async show (ctx: HttpContextContract) {
  }

  public async edit (ctx: HttpContextContract) {
  }

  public async update (ctx: HttpContextContract) {
  }

  public async destroy (ctx: HttpContextContract) {
  }
}
