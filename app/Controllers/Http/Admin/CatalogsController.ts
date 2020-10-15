import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { Storage } from "@google-cloud/storage";
import Application from "@ioc:Adonis/Core/Application";

import Catalog from "App/Models/Catalog";
import Genre from "App/Models/Genre";

export default class CatalogsController {
  public async index({ view, auth }: HttpContextContract) {
    const limit = 10;
    const catalog = await Catalog.query().paginate(1, limit);
    const user = await auth.authenticate();

    return view.render("admin/catalog/index", { catalog, user });
  }

  public async create({ view }: HttpContextContract) {
    const genres = await Genre.all();

    return view.render("admin/catalog/create", { genres });
  }

  public async store({ request, response, session }: HttpContextContract) {
    try {
      const { genres, ...data } = request.all();

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

      const save = await Catalog.create({
        name: data.name,
        description: data.description,
        release_year: data.release_year,
        quality: data.quality,
        author: data.author,
        country: data.country,
        main_image: fileName,
        type_image: data.type_image,
        published: data.published,
        qtd_seasons: data.qtd_seasons,
        url: data.url,
        meta_title: data.meta_title,
      });

      await save.related('genres').sync(genres);

      if (save) {
        return response.status(200);
      } else {
        session.flash("errors", "Aconteceu algum erro ao criar o catalogo, tente novamente..");
        return response.status(500);
      }
    } catch (error) {
      return error;
    }
  }

  public async edit({ view, params }: HttpContextContract) {
    const catalog = await Catalog.query().preload('genres').where('id', params.id).first();

    return view.render("admin/catalog/edit", { catalog });
  }

  public async update({
    request,
    response,
    params,
    session,
  }: HttpContextContract) {
    try {
      const catalog = await Catalog.findOrFail(params.id);
      const { genres, ...data } = request.all();

      catalog.name = data.name;
      catalog.description = data.description;
      catalog.release_year = data.release_year;
      catalog.quality = data.quality;
      catalog.author = data.author;
      catalog.country = data.country;
      catalog.published = data.published;
      catalog.qtd_seasons = data.qtd_seasons;
      catalog.url = data.url;
      catalog.meta_title = data.meta_title;

      await catalog.save();

      await catalog.related('genres').sync(genres);

      if (catalog) {
        session.flash("sucess", "Anime editado com Sucesso :)");
        return response.redirect().toRoute("catalog.index");
      } else {
        session.flash("errors", "Aconteceu algum erro ao editar o Anime :(");
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

      const catalog = await Catalog.findOrFail(params.id);
      const thumb = await storage.bucket("onlypiece-thumbs").file(catalog.main_image);

      // if (thumb.name == catalog.main_image) {
      //   await thumb.delete();
      // }
      if (catalog) {
        await thumb.delete();
        await catalog.delete();
      }

      if (catalog.delete()) {
        session.flash("sucess", "Anime deletado com Sucesso :'(");
        return response.redirect().toRoute("catalog.index");
      } else {
        session.flash("errors", "Aconteceu algum erro ao deletar o Anime :')");
        return response.redirect().toRoute("catalog.index");
      }
    } catch (error) {
      return error;
    }
  }
}
