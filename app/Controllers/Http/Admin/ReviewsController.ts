import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Review from 'App/Models/Review';

export default class ReviewsController {
  public async index ({ view }: HttpContextContract) {
    const limit = 10;
    const reviews = await Review.query().preload('user').preload('catalog').paginate(1, limit);

    // return reviews;

    return view.render("admin/review/index", { reviews });
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

  public async destroy ({ params, response, session }: HttpContextContract) {
    try {
      const review = await Review.findOrFail(params.id);

      await review.delete();

      if (review.delete()) {
        session.flash("sucess", "Review deletado com Sucesso");
        return response.redirect().toRoute("reviews.index");
      } else {
        session.flash("errors", "Aconteceu algum erro ao deletar o Review");
        return response.redirect().toRoute("reviews.index");
      }
    } catch (error) {
      return error;
    }
  }
}
