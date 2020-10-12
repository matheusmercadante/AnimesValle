import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { Storage } from "@google-cloud/storage";
import Application from "@ioc:Adonis/Core/Application";

import Catalog from "App/Models/Catalog";
import Season from "App/Models/Season";

export default class SeasonsController {
  public async create({ view, params }: HttpContextContract) {
    if (params.id) {
      const catalog = await Catalog.findOrFail(params.id);

      return view.render("admin/season/create", { catalog });
    } else {
      const catalogs = await Catalog.all();

      return view.render("admin/season/create", { catalogs });
    }
  }

  public async store({ request, response, session }: HttpContextContract) {
    try {
      const data = request.all();

      const fileNameYear = `${new Date().getFullYear()}`;
      const fileNameMouth = `${new Date().getMonth()}`;
      const fileNameDay = `${new Date().getDay()}`;
      const fileNameHours = `${new Date().getHours()}`;
      const fileNameMinute = `${new Date().getMinutes()}`;

      const fileName = `${
        fileNameYear +
        fileNameMouth +
        fileNameDay +
        fileNameHours +
        fileNameMinute
      }.${data.type_image}`;

      const save = await Season.create({
        catalog_id: data.catalog_id,
        name: data.name,
        main_image: fileName,
        type_image: data.type_image,
        published: data.published,
        qtd_episodes: data.qtd_episodes,
        url: data.url
      });

      if (save) {
        session.flash("sucess", "Temporada adicionada com Sucesso :)");
        return response
          .redirect()
          .toRoute("season.show", { id: data.catalog_id });
      } else {
        session.flash(
          "errors",
          "Aconteceu algum erro ao adicionar a Temporada :("
        );
        return response.redirect().toRoute("catalog.index");
      }
    } catch (error) {
      return error;
    }
  }

  public async show({ params, response, view, session }: HttpContextContract) {
    const catalog = await Catalog.query().preload('seasons', (query) => {
      query.preload('episodes').where('catalog_id', params.id);
    }).where('id', params.id).first();

    if (catalog != null) {
      // const seasons = await Season.query()
      //   .where("catalog_id", params.id)
      //   .preload("episodes")
      //   .paginate(1, limit);

      return view.render("admin/season/index", { catalog });
    } else {
      session.flash("errors", "Esse anime não existe..");
      return response.redirect().toRoute("catalog.index");
    }
  }

  public async edit({ view, params }: HttpContextContract) {
    const catalog = await Catalog.query().preload('seasons', (query) => {
      query.where('id', params.id).first();
    }).where('id', params.catalog_id).first();

    const season = catalog?.seasons[0];

    return view.render("admin/season/edit", { catalog, season });
  }

  public async update({ params, request, response, session }: HttpContextContract) {
    try {
      const season = await Season.findOrFail(params.id);
      const data = request.all();

      season.name = data.name;
      season.type_image = data.type_image;
      season.published = data.published;
      season.qtd_episodes = data.qtd_episodes;
      season.url = data.url;

      await season.save();

      if (season) {
        session.flash("sucess", "Temporada editada com Sucesso :)");
        return response.redirect().toRoute("catalog.index");
      } else {
        session.flash("errors", "Aconteceu algum erro ao editar a Temporada :(");
        return response.redirect().toRoute("catalog.index");
      }
    } catch (error) {
      return error;
    }
  }

  public async destroy({ params, response, session }: HttpContextContract) {
    try {
      const storage = new Storage({
        keyFilename: `${Application.publicPath(
          "only-piece-23d59b900086.json"
        )}`,
        projectId: "only-piece",
      });

      const season = await Season.findOrFail(params.id);

      if (season) {
        await storage.bucket("onlypiece-thumbs").file(season.main_image).delete();
        await season.delete();
      }

      if (season.delete()) {
        session.flash("sucess", "Temporada deletada com Sucesso :'(");
        return response.redirect().toRoute("catalog.index");
      } else {
        session.flash("errors", "Aconteceu algum erro ao deletar a Temporada :')");
        return response.redirect().toRoute("catalog.index");
      }
    } catch (error) {
      return error;
    }
  }
}
