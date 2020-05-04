const express = require("express"); // CommonJS Modules

const server = express();

server.use(express.json()); // teaches express how to read JSON from the body

let kitties = [
  {
    id: 1,
    name: "Kitty",
    bio: "Meow!"
  },
];

server.get("/api/users/", (req, res) => {
  res.json({ api: "Wow its working!" });
});

server.get("/api/users/:id", function (req, res) {
  // return an array of lessons (id, name)

  res.json(kitties);
});

server.post("/api/users", function (req, res) {
  const kittyInformation = req.body;

  if(kittyInformation.name && kittyInformation.bio){
  kitties.push(kittyInformation);

  res.status(201).json(kittyInformation);
  } else {
      res.status(400).json({errorMessage: "Please provide name and bio for the user."})
  }
});

server.delete("/api/users/:id", function (req, res) {
  const id = Number(req.params.id);

  // find the lesson on the array and remove it
  kitties = kitties.filter(kitty => kitty.id !== id);

  res.status(200).json(kitties);
});

server.listen(8000, () => console.log("\n== API is up ==\n"));
