import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import Catalog from "App/Models/Catalog";

export default class DashboardsController {
  public async index({ view }: HttpContextContract) {
    const limit = 5;
    const catalog = await Catalog.query().paginate(1, limit);

    return view.render("admin/dashboard/index", { catalog });
  }
}
