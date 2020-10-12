import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Genre from "App/Models/Genre";

export default class GenresController {
  public async index({ view }: HttpContextContract) {
    const limit = 10;
    const genres = await Genre.query().paginate(1, limit);

    return view.render("admin/genre/index", { genres });
  }

  public async create({ view }: HttpContextContract) {
    return view.render("admin/genre/edit");
  }

  public async store({ request, response, session }: HttpContextContract) {
    try {
      const data = request.all();

      const save = Genre.create({
        name: data.name,
        url: data.url,
        meta_title: data.meta_title,
      });

      if (save) {
        session.flash("sucess", "Gênero criado com Sucesso");
        return response.redirect().toRoute("genre.index");
      } else {
        session.flash("errors", "Aconteceu algum erro ao criar o gênero");
        return response.redirect().toRoute("genre.index");
      }
    } catch (error) {
      return error;
    }
  }

  public async edit({ params, view }: HttpContextContract) {
    const genre = await Genre.findOrFail(params.id);

    return view.render("admin/genre/edit", { genre });
  }

  public async update({
    params,
    request,
    response,
    session,
  }: HttpContextContract) {
    try {
      const genre = await Genre.findOrFail(params.id);
      const data = request.all();

      genre.merge(data);

      await genre.save();

      if (genre) {
        session.flash("sucess", "Gênero editado com Sucesso :)");
        return response.redirect().toRoute("genre.index");
      } else {
        session.flash("errors", "Aconteceu algum erro ao editar o gênero :(");
        return response.redirect().toRoute("genre.index");
      }
    } catch (error) {
      return error;
    }
  }

  public async destroy({ params, response, session }: HttpContextContract) {
    try {
      const genre = await Genre.findOrFail(params.id);

      if (genre) {
        await genre.delete();
      }

      if (genre.delete()) {
        session.flash("sucess", "Gênero deletado com Sucesso :'(");
        return response.redirect().toRoute("genre.index");
      } else {
        session.flash("errors", "Aconteceu algum erro ao deletar o Gênero :')");
        return response.redirect().toRoute("genre.index");
      }
    } catch (error) {
      return error;
    }
  }
}
