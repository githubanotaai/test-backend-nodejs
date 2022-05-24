const InitServer = require("./init-server");
const port = process.env.PORT || 3000;
const init = async () => {
  const server = await InitServer();
  server.listen(port, () => {
    console.log(`[INFO] Listening on port ${port}`);
  });
};

init();
