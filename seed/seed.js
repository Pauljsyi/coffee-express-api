const mongoose = require("mongoose");
const Coffee = require("../models/coffee.model");
const db = require("../config/mongoose.config");
const fetch = require("node-fetch");

let resultData;
let saveCounter = 0;

// const url = ["https://api.sampleapis.com/coffee/hot"];
const url = ["https://coffee-express-api.onrender.com/coffee"];

const coffee_price = [
  { title: "Americano", price: "price_1NvvK7JgWPjDbO5aHn921ONz" },
  { title: "Espresso", price: "price_1NvvLLJgWPjDbO5aVVr51FBS" },
  { title: "Doppio", price: "price_1NvvREJgWPjDbO5a6XtmyPau" },
  { title: "Cortado", price: "price_1NvvSKJgWPjDbO5aTqDtCirn" },
  { title: "Black", price: "price_1NvvSzJgWPjDbO5anMGnneWL" },
  { title: "Latte", price: "price_1NvvTZJgWPjDbO5a7WBe9VLc" },
  { title: "Lungo", price: "price_1NvvU8JgWPjDbO5aqbD9gFGz" },
  { title: "Macchiato", price: "price_1NvvUnJgWPjDbO5a4JC6gdPR" },
  { title: "Mocha", price: "price_1NvvVPJgWPjDbO5avyZOnEtR" },
  { title: "Ristretto", price: "price_1NvvW8JgWPjDbO5aA6kBmbUT" },
  { title: "Flat White", price: "price_1NvvWdJgWPjDbO5a8dof0JM7" },
  { title: "Affogato", price: "price_1NvvXIJgWPjDbO5aJrM7xpUL" },
  { title: "Café au Lait", price: "price_1NvvZ1JgWPjDbO5a0xQQZ52Z" },
  { title: "Irish", price: "price_1NvvZeJgWPjDbO5ab8w6o3wv" },
  { title: "Guayoyo", price: "price_1NvvaRJgWPjDbO5aafalGVhB" },
  { title: "Cortadito", price: "price_1NvvbCJgWPjDbO5aii4wDhiz" },
  { title: "Aguapanela Coffee", price: "price_1NvvbsJgWPjDbO5anNX55Kwl" },
  { title: "Cappuccino", price: "price_1NvvcfJgWPjDbO5aWGF9CmQB" },
  { title: "CUPOJOE", price: "price_1NvvdLJgWPjDbO5avOSgM7Su" },
  { title: "Red Eye", price: "price_1NvvdmJgWPjDbO5aiVhsL46S" },
  { title: "Galão", price: "price_1NvveIJgWPjDbO5a1fNdMJYr" },
];

console.log(coffee_price.length);

// console.log("url: ", url);

url.map(async (url) => {
  try {
    const res = await fetch(url);
    const json = await res.json();
    resultData = [...json];
    resultData.map((item, idx) => {
      // console.log(item.title);
      // item.price = Math.floor(Math.random() * (5 - 10) + 10);
      const coffeeItems = coffee_price
        .map((item) => item)
        .filter((filter) => {
          return filter.title.includes(item.title);
        });

      // console.log("id before reassignment: ", item);

      const newId = coffeeItems[0].price;
      const newItem = {
        ...item,
        id: newId,
      };
      // console.log({ item }, { newItem });

      let coffee = new Coffee(newItem);
      // coffee.id = coffeeItems[0].price;
      console.log(coffee.id);

      coffee.save(() => {
        console.log("saved" + coffee);
        saveCounter++;
        if (saveCounter === resultData.length) {
          mongoose
            .disconnect()
            .then(() =>
              console.log("saved successfully and mongodb disconnected")
            )
            .catch((error) => console.log(error));
        }
      });
    });
    // console.log("resultData: ", resultData);
  } catch (error) {
    console.log("error", error);
  }
});
