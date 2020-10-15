import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Genre from 'App/Models/Genre'

export default class GenreSeeder extends BaseSeeder {
  public async run () {
    await Genre.createMany([
      {
        name: "Ação",
        url: "acao",
        meta_title: "Animes Valle | Animes de Ação"
      },
      {
        name: "Aventura",
        url: "aventura",
        meta_title: "Animes Valle | Animes de Aventura"
      },
      {
        name: "Fantasia",
        url: "fantasia",
        meta_title: "Animes Valle | Animes de Fantasia"
      },
      {
        name: "Mistério",
        url: "mistério",
        meta_title: "Animes Valle | Animes de Mistério"
      },
      {
        name: "Ficção",
        url: "ficcao",
        meta_title: "Animes Valle | Animes de Ficção"
      },
      {
        name: "Suspense",
        url: "suspense",
        meta_title: "Animes Valle | Animes de Suspense"
      },
      {
        name: "Drama",
        url: "drama",
        meta_title: "Animes Valle | Animes de Drama"
      },
      {
        name: "Terror",
        url: "terror",
        meta_title: "Animes Valle | Animes de Terror"
      },
    ])
  }
}
