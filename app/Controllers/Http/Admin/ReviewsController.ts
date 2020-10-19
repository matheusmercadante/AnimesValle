import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Catalog from 'App/Models/Catalog';
import Review from 'App/Models/Review';
import User from 'App/Models/User';

import Ws from 'App/Services/Ws';

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
      const catalog = await Catalog.findOrFail(params.catalog_id);
      const user = await User.findOrFail(params.user_id);

      const save = await Review.create({
        // catalog_id: params.catalog_id,
        user_id: params.user_id,
        title: data.title,
        description: data.description,
        // rating: data.rating,
      });

      await save.related('catalog').attach({
        [catalog.id]: {
          rating: data.rating
        }
      })

      const catalogAtt = await Catalog.query().preload('reviews', (query) => {
        query.pivotColumns(['rating'])
      }).where('id', params.catalog_id).first();

      const ratings =  catalogAtt?.reviews.map((rating) => {
        return rating.$extras.pivot_rating;
      });

      const ratingSoma = ratings?.reduce((total, rating) => {
        return total + rating;
      }, 0)

      const ratingMedia = ratingSoma / ratings?.length;

      catalogAtt.rating = ratingMedia;

      await catalogAtt.save();

      if (save) {
        Ws.io.emit('reviews', {
          user: user.username,
          catalog: catalog.name,
          delete: false
        });
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
        Ws.io.emit('reviews', {
          delete: true
        });
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
