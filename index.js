const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const myRecipe = [{
  title:"Scrambled Eggs",
  level: 'Easy Peasy',
  ingredients : ["Eggs","More eggs"],
  cuisine : "cuisine field",
  dishType: "breakfast",
  creator: "Victor"
}]

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe
      .insertMany(myRecipe)
      .then(() => console.log("I am here"))
      .then(()=>{
        Recipe.insertMany(data)
      }

      )
      
    
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

