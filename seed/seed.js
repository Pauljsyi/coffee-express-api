const mongoose = require("mongoose");
const Coffee = require("../models/coffee.model");
const db = require("../config/mongoose.config");
const fetch = require("node-fetch");

let resultData;
let saveCounter = 0;

const url = ["https://api.sampleapis.com/coffee/hot"];

console.log("url: ", url);

url.map(async (url) => {
  try {
    const res = await fetch(url);
    const json = await res.json();
    resultData = [...json];
    resultData.map((item, idx) => {
      item.price = Math.floor(Math.random() * (5 - 10) + 10);
      // console.log("item inside map func: ", item);
      let coffee = new Coffee(item);
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
// url.map(async (url) => {
//   try {
//     const response = await fetch(url);
//     const json = await response.json();
//     resultData = [...json];
//     for (let i = 0; i < resultData.length; i++) {
//       let skateSpot = new SkateSpot({
//         name: resultData[i].name,
//         description: resultData[i].status,
//         location: {
//           coordinates: [
//             resultData[i].polygon.coordinates[0][0][1],
//             resultData[i].polygon.coordinates[0][0][0],
//           ],
//         },
//       });
//       skateSpot.save(() => {
//         console.log("saved" + skateSpot);

//         saveCounter++;

//         if (saveCounter === resultData.length) {
//           mongoose
//             .disconnect()
//             .then(() =>
//               console.log("saved succesfully and mongodb   disconnected")
//             )
//             .catch((error) => console.log(error));
//         }
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });
