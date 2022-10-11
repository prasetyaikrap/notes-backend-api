// import routes from "./routes.js";
import * as dotenv from "dotenv";
dotenv.config();
import Hapi from "@hapi/hapi";
import notes from "./api/notes/index.js";
import NotesService from "./services/inMemory/serviceNotes.js";
import NotesValidator from "./validator/notes/index.js";

const init = async () => {
  const notesService = new NotesService();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  // server.route(routes);

  await server.register({
    plugin: notes,
    options: {
      service: notesService,
      validator: NotesValidator,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
