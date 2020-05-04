const express = require("express"); // CommonJS Modules

const server = express();

server.use(express.json()); // teaches express how to read JSON from the body

let lessons = [
  {
    id: 1,
    name: "Meow Meow",
  },
];

server.get("/api/users/", (req, res) => {
  res.json({ api: "Wow its working!" });
});

server.get("/api/users/:id", function (req, res) {
  // return an array of lessons (id, name)

  res.json(lessons);
});

server.post("/api/users", function (req, res) {
  const lessonInformation = req.body;

  lessons.push(lessonInformation);

  res.status(201).json(lessonInformation);
});

server.delete("/api/users/:id", function (req, res) {
  const id = Number(req.params.id);

  // find the lesson on the array and remove it
  lessons = lessons.filter(lesson => lesson.id !== id);

  res.status(200).json(lessons);
});

server.listen(8000, () => console.log("\n== API is up ==\n"));
