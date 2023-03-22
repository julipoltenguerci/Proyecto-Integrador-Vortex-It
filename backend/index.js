const app = require("./src/main");

//Se inicia el backend,servidor de la app escuchando conexiones entrantes en el puerto
function init() {
  app.listen(app.get("PORT"), () =>
    console.log(`Server listening on port ${app.get("PORT")}`)
  );
}

init();
