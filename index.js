const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const myRecipe = [
  {
    title: "Scrambled Eggs",
    level: "Easy Peasy",
    ingredients: ["Eggs", "More eggs"],
    cuisine: "cuisine field",
    dishType: "breakfast",
    creator: "Victor",
  },
];

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe
      //iteration 2
      .insertMany(myRecipe)
      .then(() => console.log("I am here"))
      //Iteration 3
      .then(() => {
        Recipe.insertMany(data)
          // iteration 4
          .then(() => {
            Recipe.findOneAndUpdate(
              { title: "Rigatoni alla Genovese" },
              { duration: 100 },
              { new: true }
            )
              //iteration 5
              .then(() => {
                Recipe.deleteOne({ title: "Carrot Cake" })
                //iteration 6
                .then(()=>{
                  Recipe.db.close()
                  .then(()=>{console.log(isOpen(Recipe))})
                })
              });
          });
      });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });



  function isOpen(db) {
    return !db.hasOwnProperty('_secret_did_close');
  }


  ///Questions
  ///Why don't we need a then after the return on line 27 ?
  // How to make sur the DB is closed ?