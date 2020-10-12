import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Catalog from "App/Models/Catalog";
import Genre from "App/Models/Genre";

export default class PagesController {
  public async home({ view }: HttpContextContract) {
    const limitDesq = 10;
    const catalogDesq = await Catalog.query()
      .preload("genres")
      .paginate(1, limitDesq);

    const limitCatalog = 18;
    const catalogRec = await Catalog.query()
      .preload("genres")
      .orderBy("created_at", "desc")
      .paginate(1, limitCatalog);

    return view.render("pages/home", { catalogDesq, catalogRec });
  }

  public async catalog({ view }: HttpContextContract) {
    const limitCatalog = 18;
    const genres = await Genre.all();
    const catalog = await Catalog.query()
      .preload("genres")
      .orderBy("name", "desc")
      .paginate(1, limitCatalog);

    return view.render("pages/catalog", { catalog, genres });
  }

  public async search({ request, view }:HttpContextContract) {
    const catalogSearch = request.input('catalog_search');

    const catalog = await Catalog.query().preload('genres').where('name', 'LIKE', `%${catalogSearch}%`);

    return view.render('pages/catalog-search', { catalog })
  }

  public async profile({ view, auth }: HttpContextContract) {
    const user = await auth.authenticate();

    return view.render("pages/profile", { user });
  }

  public async contact({ view }: HttpContextContract) {
    return view.render("pages/contact");
  }

  public async about({ view }: HttpContextContract) {
    return view.render("pages/about");
  }

  public async faq({ view }: HttpContextContract) {
    return view.render("pages/faq");
  }

  public async details({ params, view }: HttpContextContract) {
    const catalog = await Catalog.query()
      .preload("genres")
      .preload("seasons", (query) => {
        query.preload("episodes");
      })
      .where("url", params.url)
      .first();


    const catalogsRecomendations = await Catalog.query().whereNot('name', `${catalog?.name}`)
      .whereHas('genres', (query) => {
        const genre = catalog?.genres[0].name;

        query.where('name', `${genre}`);
      });

    return view.render("pages/details", { catalog, catalogsRecomendations });
  }

  public async episode({ params, response, view }: HttpContextContract) {
    const epSearch = await Catalog.query().preload('seasons', (query) => {
      query.preload('episodes', (query) => {
        query.where('ep_url', params.ep_url).first();
      }).where('url', params.season_url).first();
    }).where('url', params.catalog_url).first();

    const ep = epSearch?.seasons[0].episodes[0];

    if (ep) {
      return view.render("pages/episode", { ep });
    } else {
      return response.redirect().toRoute("home");
    }
  }
}
