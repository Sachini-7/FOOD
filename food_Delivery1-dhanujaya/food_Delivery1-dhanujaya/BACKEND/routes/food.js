const router = require("express").Router();
const Food = require("../models/food");

router.route("/add").post(async (req, res) => {
    const { foodname, price, description } = req.body;
    try {
        // Create a new instance of the Food model with the provided data
        const newFood = new Food({
            foodname,
            price,
            description
        });

        // Save the new food item to the database
        const savedFood = await newFood.save();

        // Send a success response
        res.status(200).json({ message: "Food added successfully", data: savedFood });
    } catch (error) {
        // Handle errors
        console.error("Error adding food:", error);
        res.status(500).json({ error: "An error occurred while adding food" });
    }
});


router.route("/fetch").get((req, res) => {
    Food.find()
        .then((food) => {
            res.json(food);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

module.exports = router;
