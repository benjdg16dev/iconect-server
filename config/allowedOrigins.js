require("dotenv").config();

const allowedOrigins = [];

if (process.env.NODE_ENV === "production")
  allowedOrigins.push(process.env.ORIGIN_PROD);
else if (process.env.NODE_ENV === "development")
  allowedOrigins.push(process.env.ORIGIN_DEV);

module.exports = allowedOrigins;
