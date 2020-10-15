import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import Catalog from "App/Models/Catalog";
import User from "App/Models/User";

export default class DashboardsController {
  public async index({ view, auth }: HttpContextContract) {
    const limit = 5;
    const catalog = await Catalog.query().paginate(1, limit);
    const user = await auth.authenticate();

    const users = await User.query().orderBy('created_at', 'desc').paginate(1, limit);

    return view.render("admin/dashboard/index", { catalog, users, user });
  }
}
