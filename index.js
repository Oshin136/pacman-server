import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

let data;

function getData() {
  try {
    data = JSON.parse(fs.readFileSync("scores.json"));
  } catch (error) {
    fs.writeFileSync("scores.json", '{"highscore": 0}', (err) => {
      console.log(err);
    });
    data = JSON.parse(fs.readFileSync("scores.json"));
  }
}

app.get("/highscore", (_req, res) => {
  getData();
  res.json(data);
});

app.put("/highscore", (req, res) => {
  getData();
  console.log("here", req.body);
  let score = +req.body.score;
  if (score > +data.highscore) {
    data.highscore = score;
  }
  fs.writeFileSync("scores.json", JSON.stringify(data));
  res.json({
    message: "success",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
