const express = require("express"); // CommonJS Modules

const shortid = require("shortid");

const server = express();

server.use(express.json()); // teaches express how to read JSON from the body

let kitties = [
  {
    id: "1",
    name: "Kitty",
    bio: "Meow!",
  },
];

server.get("/api/users/", (req, res) => {
  res.status(200).json(kitties);
});

server.get("/api/users/:id", function (req, res) {
  // return an array of lessons (id, name)

  res.json(kitties);
});

server.post("/api/users", function (req, res) {
  const kittyInformation = req.body;

  if (kittyInformation.name && kittyInformation.bio) {
    kittyInformation.id = shortid.generate();
    //shortid to generate a new id
    kitties.push(kittyInformation);
    res.status(201).json(kittyInformation);
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
});

server.delete("/api/users/:id", function (req, res) {
  const oldLength = kitties.length;
  // find the lesson on the array and remove it
  kitties = kitties.filter((kitty) => kitty.id !== req.params.id);

  if (oldLength === kitties.length) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  }
  res.status(500).json(kitties);
  //   res.status(500).json(kitties);
});

server.put("/api/users/:id", function (req, res) {
  const id = req.params.id;
  //creating a new const variable named id
  const kitty = kitties.find((kitty) => kitty.id === id);

  if (!kitty) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else {
    if (!req.body.name || !req.body.bio) {
      res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
    } else {
      kitty.name=req.body.name
      kitty.bio=req.body.bio
      res.status(200).json(kitty);
    }
  }
});

server.listen(8000, () => console.log("\n== API is up ==\n"));
