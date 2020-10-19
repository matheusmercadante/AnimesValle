import User from "App/Models/User";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import Ws from 'App/Services/Ws';

export default class AuthController {
  public async register({ request, auth, response, session }: HttpContextContract) {
    /**
     * Validate user details
     */
    const validationSchema = schema.create({
      username: schema.string({ trim: true }, [
        rules.unique({ table: "users", column: "username" })
      ]),
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: "users", column: "email" }),
      ]),
      password: schema.string({ trim: true }, [rules.confirmed()]),
    });

    const userDetails = await request.validate({
      schema: validationSchema,
    });

    /**
     * Create a new user
     */
    const user = new User();
    user.username = userDetails.username;
    user.email = userDetails.email;
    user.password = userDetails.password;
    await user.save();

    if (user) {
      await auth.login(user);
      Ws.io.emit('newUsers', 'Alguém acabou de se cadastrar');
      session.flash("sucess", "Seja bem vindo(a) ao Anime Valle <3 :)");
      response.redirect().toRoute("home");
    } else {
      response.redirect('back');
    }
  }

  public async login({ auth, request, response, session }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");

    await auth.attempt(email, password);

    session.flash("sucess", "Logado com Sucesso, divirta-se :)");
    response.redirect().toRoute("perfil");
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout();
    response.redirect().toRoute("home");
  }
}
