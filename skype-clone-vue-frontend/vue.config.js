// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");

module.exports = {
  devServer: {
    https: {
      key: fs.readFileSync("../cert/example.com+4-key.pem", "utf8"),
      cert: fs.readFileSync("../cert/example.com+4.pem", "utf8")
    },
    //public: "https://localhost:8080/"
    host: "192.168.43.106",
    port: 8080, // CHANGE YOUR PORT HERE!
    hotOnly: false
  }
};
