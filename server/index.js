import setupServer from "./server.js";
const PORT = process.env.PORT || 8000;
const server = setupServer();

(() => {
  server.listen(PORT, () => {
    console.log(`app is listening port ${PORT}`);
  });
})();
