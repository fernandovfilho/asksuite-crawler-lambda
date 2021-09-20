const serverless = require("serverless-http");
const express = require("express");
const app = express();
const { DateTime } = require("luxon");
const { roomSearch } = require("./services/BrowserService");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.post("/search", async (request, response, next) => {
  try {
    let { checkin, checkout } = request.body;
    checkin = DateTime.fromISO(checkin).toFormat("ddMMyyyy");
    checkout = DateTime.fromISO(checkout).toFormat("ddMMyyyy");

    const rooms = await roomSearch(checkin, checkout);
    return response.json(rooms);
  } catch (error) {
    console.log("error", error);
    return response.status(500).json(error);
  }
});

module.exports.handler = serverless(app);
