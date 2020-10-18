/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", "PagesController.home").as("home");

Route.on("register").render("auth/register");
Route.post("register", "AuthController.register").as("register");

Route.on("login").render("auth/login");
Route.post("/login", "AuthController.login").as("login");

Route.on("recuperarsenha").render("auth/forgotPassword");
Route.any("/logout", "AuthController.logout").as("logout");


Route.get("/profile", "PagesController.profile")
  .as("perfil")
  .middleware(["auth"]);

Route.get("/catalogo", "PagesController.catalog").as("catalogo");
Route.get("/contato", "PagesController.contact").as("contato");
Route.get("/sobre", "PagesController.about").as("sobre");
Route.get("/faq", "PagesController.faq").as("faq");

Route.get("/:url?", "PagesController.details").as("details");

Route.get("/assistir/:catalog_url/:season_url/:ep_url?", "PagesController.episode").as(
  "episode"
);

Route.any("/search", "PagesController.search").as(
  "catalog.search"
);
Route.post("/upload/:catalog_name?/file", "UploadsController.upload").as("upload");
Route.post("/upload-update/:name?/file", "UploadsController.uploadUpdate").as("uploadUpdate");

Route.post("/upload-video/:catalog_name?/file", "UploadsController.uploadVideo").as("uploadVideo");
Route.post("/upload-video-update/:directory?/:name?/file", "UploadsController.uploadVideoUpdate").as("uploadVideoUpdate");

Route.post('/reviews/:catalog_id?/:user_id?', 'Admin/ReviewsController.store').as('reviews.store');

Route.post('/messages', 'Admin/MessagesController.store').as('messages.store');

Route.group(() => {
  Route.resource("dashboard", "DashboardsController");

  Route.resource("catalog", "CatalogsController").except(['show']);

  Route.resource("season", "SeasonsController").except(["create", "edit"]);
  Route.get("/season/create/:id?", "SeasonsController.create").as(
    "season.create"
  );
  Route.get("/season/:catalog_id?/:id?/edit", "SeasonsController.edit").as(
    "season.edit"
  );

  Route.resource("episode", "EpisodesController").except(["create", "edit", 'store']);
  Route.get("/episode/create/:id?", "EpisodesController.create").as(
    "episode.create"
  );
  Route.get("/episode/:season_id?/:id?/edit", "EpisodesController.edit").as(
    "episode.edit"
  );
  Route.post("/episode/:catalog_name?/file", "EpisodesController.store").as(
    "episode.store"
  );

  Route.resource("genre", "GenresController").except(['show']);

  Route.resource("users", "UsersController");

  Route.resource('reviews', 'ReviewsController').except(['store', 'create']);

  Route.resource('messages', 'MessagesController').except(['store', 'create']);
})
  .prefix("/panel")
  .namespace("App/Controllers/Http/Admin")
  .middleware(["auth", 'acl:admin']);

