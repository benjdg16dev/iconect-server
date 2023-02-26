const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  // Note: !origin for development because it is undefined
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // pass
      // callback(error, and if origin is sent back)
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
