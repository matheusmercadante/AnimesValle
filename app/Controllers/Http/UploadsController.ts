import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { Storage } from "@google-cloud/storage";
import Application from "@ioc:Adonis/Core/Application";

export default class UploadsController {
  public async upload({ request, response }: HttpContextContract) {
    try {
      const storage = new Storage({
        keyFilename: `${Application.publicPath(
          "only-piece-23d59b900086.json"
        )}`,
        projectId: "only-piece",
      });

      const onlyPieceBucket = storage.bucket("onlypiece-thumbs");

      // return storage.getBuckets().then((x) => console.log(x));

      await request.multipart
        .onFile("main_image", {}, async (file) => {
          // console.log(file.clientName);

          const fileNameYear = `${new Date().getFullYear()}`;
          const fileNameMouth = `${new Date().getMonth()}`;
          const fileNameDay = `${new Date().getDay()}`;
          const fileNameHours = `${new Date().getHours()}`;
          const fileNameMinute = `${new Date().getMinutes()}`;

          const fileType = file.filename.substr(file.filename.length - 3);
          const fileName = `${
            fileNameYear +
            fileNameMouth +
            fileNameDay +
            fileNameHours +
            fileNameMinute
          }.${fileType}`;

          // const fileName = `${Date.now()}.${file.subtype}`;

          const onlyPieceBucketFile = onlyPieceBucket.file(`${fileName}`);

          file.pipe(
            onlyPieceBucketFile.createWriteStream({
              metadata: {
                contentType: file.headers["content-type"],
              },
            })
          );
        })
        // .field((name, value) => {
        //   console.log(name, value);
        // })
        .process();

      return response.redirect().toRoute("catalog.index");
    } catch (error) {
      return error;
    }
  }

  public async uploadUpdate({ request, response, params }: HttpContextContract) {
    try {
      const storage = new Storage({
        keyFilename: `${Application.publicPath(
          "only-piece-23d59b900086.json"
        )}`,
        projectId: "only-piece",
      });

      const onlyPieceBucket = storage.bucket("onlypiece-thumbs");

      await request.multipart
        .onFile("main_image", {}, async (file) => {
          const fileName = params.name;

          const onlyPieceBucketFile = onlyPieceBucket.file(`${fileName}`);

          file.pipe(
            onlyPieceBucketFile.createWriteStream({
              metadata: {
                contentType: file.headers["content-type"],
              },
            })
          );
        })
        .process();

      return response.redirect().toRoute("catalog.index");
    } catch (error) {
      return error;
    }
  }

  public async uploadVideo({ request, response }: HttpContextContract) {
    try {
      const storage = new Storage({
        keyFilename: `${Application.publicPath(
          "only-piece-23d59b900086.json"
        )}`,
        projectId: "only-piece",
      });

      const onlyPieceBucket = storage.bucket("onlypiece-eps");

      // return storage.getBuckets().then((x) => console.log(x));

      await request.multipart
        .onFile("episode_video", {}, async (file) => {
          // console.log(file.clientName);

          const fileNameYear = `${new Date().getFullYear()}`;
          const fileNameMouth = `${new Date().getMonth()}`;
          const fileNameDay = `${new Date().getDay()}`;
          const fileNameHours = `${new Date().getHours()}`;
          const fileNameMinute = `${new Date().getMinutes()}`;

          const fileType = file.filename.substr(file.filename.length - 3);
          const fileName = `${
            fileNameYear +
            fileNameMouth +
            fileNameDay +
            fileNameHours +
            fileNameMinute
          }.${fileType}`;

          // const fileName = `${Date.now()}.${file.subtype}`;

          const onlyPieceBucketFile = onlyPieceBucket.file(`${fileName}`);

          file.pipe(
            onlyPieceBucketFile.createWriteStream({
              metadata: {
                contentType: file.headers["content-type"],
              },
            })
          );
        })
        // .field((name, value) => {
        //   console.log(name, value);
        // })
        .process();

      return response.redirect().toRoute("catalog.index");
    } catch (error) {
      return error;
    }
  }

  public async uploadVideoUpdate({ request, response, params }: HttpContextContract) {
    try {
      const storage = new Storage({
        keyFilename: `${Application.publicPath(
          "only-piece-23d59b900086.json"
        )}`,
        projectId: "only-piece",
      });

      const onlyPieceBucket = storage.bucket("onlypiece-eps");

      await request.multipart
        .onFile("episode_video", {}, async (file) => {
          const fileName = params.name;

          const onlyPieceBucketFile = onlyPieceBucket.file(`${fileName}`);

          file.pipe(
            onlyPieceBucketFile.createWriteStream({
              metadata: {
                contentType: file.headers["content-type"],
              },
            })
          );
        })
        .process();

      return response.redirect().toRoute("catalog.index");
    } catch (error) {
      return error;
    }
  }
}
