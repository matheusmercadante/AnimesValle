import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import Catalog from "App/Models/Catalog";
import Review from "App/Models/Review";
import User from "App/Models/User";

export default class DashboardsController {
  public async index({ view }: HttpContextContract) {
    const limit = 5;
    const catalog = await Catalog.query().paginate(1, limit);

    const users = await User.query().orderBy('created_at', 'desc').paginate(1, limit);
    const reviews = await Review.query().preload('catalog', (query) => {
      query.pivotColumns(['rating'])
    }).preload('user').orderBy('created_at', 'desc').paginate(1, limit);

    return view.render("admin/dashboard/index", { catalog, users, reviews });
  }
}
