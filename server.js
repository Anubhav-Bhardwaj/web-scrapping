const express = require("express");
const app = express();

const path = require("path");
var cors = require("cors");
const url = require("url");
//init middleware
app.use(express.json({ extended: false }));
app.use(cors());

//scrappinhg
const request = require("request");
const cheerio = require("cheerio");

//get request to scrap data from inshorts
app.get("/scrap", async (req, res) => {
  try {
    const headings = [];
    const content = [];
    await request("https://inshorts.com/en/read/", (err, response, html) => {
      if (!err && response.statusCode === 200) {
        const $ = cheerio.load(html);
        const siteHeading = $(
          ".card-stack .news-card .news-card-title .clickable span"
        );

        siteHeading.each((i, el) => {
          const item = $(el).text();

          headings.push(item);
        });

        const siteContent = $(
          ".card-stack .news-card .news-card-content div[itemprop = 'articleBody']"
        );

        siteContent.each((i, el) => {
          const item = $(el).text();
          content.push(item);
        });

        const news = headings.map((heading, i) => {
          return { title: heading, content: content[i] };
        });
        console.log(news);
        return res.status(200).json(news);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//declaring port
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
