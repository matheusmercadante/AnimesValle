import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { Storage } from "@google-cloud/storage";
import Application from "@ioc:Adonis/Core/Application";

import Episode from "App/Models/Episode";
import Season from "App/Models/Season";

export default class EpisodesController {
  public async create({ params, view }: HttpContextContract) {
    const season = await Season.findOrFail(params.id);

    return view.render("admin/episode/create", { season });
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
      }.${data.type_video}`;

      const save = await Episode.create({
        season_id: data.season_id,
        name: data.name,
        description: data.description,
        episode_video: fileName,
        type_video: data.type_video,
        ep_url: data.ep_url,
        meta_title: data.meta_title,
      });

      if (save) {
        session.flash("sucess", "Episodio adicionada com Sucesso :)");
        return response.status(200);
      } else {
        session.flash(
          "errors",
          "Aconteceu algum erro ao adicionar o Episodio :("
        );
        return response.status(500);
      }
    } catch (error) {
      return error;
    }
  }

  public async edit({ params, view }: HttpContextContract) {
    const season = await Season.query().preload('episodes', (query) => {
      query.where('id', params.id).first();
    }).where('id', params.season_id).first();

    const episode = season?.episodes[0];

    return view.render("admin/episode/edit", { episode, season });
  }

  public async update({ params, request, response, session }: HttpContextContract) {
    try {
      const episode = await Episode.findOrFail(params.id);
      const data = request.all();

      episode.name = data.name;
      episode.description = data.description;
      episode.type_video = data.type_video;
      episode.ep_url = data.ep_url;
      episode.meta_title = data.meta_title;

      await episode.save();

      if (episode) {
        // session.flash("sucess", "Episodio editado com Sucesso :)");
        return response.status(200);
      } else {
        // session.flash("errors", "Aconteceu algum erro ao editar o Episodio :(");
        return response.status(200);
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

      const episode = await Episode.findOrFail(params.id);

      if (episode) {
        await storage.bucket("onlypiece-eps").file(episode.episode_video).delete();
        await episode.delete();
      }

      if (episode.delete()) {
        session.flash("sucess", "Episodio deletado com Sucesso :'(");
        return response.redirect().toRoute("catalog.index");
      } else {
        session.flash("errors", "Aconteceu algum erro ao deletar o Episodio :')");
        return response.redirect().toRoute("catalog.index");
      }
    } catch (error) {
      return error;
    }
  }
}
