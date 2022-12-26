const setupServer = require("./server.js");
const db = require("../db/knex");
const PORT = process.env.PORT || 8000;
const server = setupServer();

(() => {
  server.listen(PORT, () => {
    console.log(`app is listening port ${PORT}`);
  });
})();
