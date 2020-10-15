import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Review from 'App/Models/Review';

export default class ReviewsController {
  public async index (ctx: HttpContextContract) {
  }

  public async create (ctx: HttpContextContract) {
  }

  public async store ({ request, response, params, session }: HttpContextContract) {
    try {
      const data = request.all();

      const save = await Review.create({
        catalog_id: params.catalog_id,
        user_id: params.user_id,
        title: data.title,
        description: data.description,
        rating: data.rating,
      });

      if (save) {
        session.flash("sucess", "Review enviado com Sucesso!");
        return response.redirect().back();
      } else {
        session.flash("errors", "Aconteceu algum erro, tente novamente..");
        return response.redirect().back();
      }
    } catch (error) {
      return error;
    }
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
