import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;  

app.use(cors({
  origin: "http://localhost:8080"
}));

app.get("/health", (req, res) => {

  if(!req.headers["x-forwarded-for"]) return res.status(400).send("Bad Request: Missing X-Forwarded-For header");

  res.send(`"Hello World!",${req.header}`);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
