// Import the express module
const express = require("express")

// Import the car data module
const { carsForSale } = require("./model/carData.js")

// Instantiate the Express framework.
const app = express()

// Set up folder location for static pages
// Note: we will need to change to __dirname + "/public" later
app.use(express.static("public"))

// Start the server
app.listen(3000, () => {
    console.log("Server has started")
})

app.get("/cars", (req, res) => {
    res.json(carsForSale)
})

app.get("/listing", (req, res) => {
    let listing = [];
  
    carsForSale.forEach((car) => {
      let carListing = {
        make: car.make,
        model: car.model,
        price: car.price,
        year: car.year,
      };
  
      listing.push(carListing);
    });

    res.send(listing);
  });

app.get("/cars/makes", (req, res) =>{
    let makes = new Set();

    carsForSale.forEach((car) => {
        makes.add(car.make);
    })

    let makesArray = Array.from(makes);

    res.send(makesArray);
})

app.get("/cars/sellers", (req, res) =>{
    let sellers = [];

    carsForSale.forEach((car) =>{
        sellers.push(car.seller);
    })
    
    res.send(sellers);
})

