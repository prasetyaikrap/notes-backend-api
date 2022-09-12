import Hapi from "@hapi/hapi";
// import routes from "./routes.js";
import notes from "./api/notes/index.js";
import NotesService from "./services/inMemory/serviceNotes.js";

const init = async () => {
  const notesService = new NotesService();
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0",
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
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
