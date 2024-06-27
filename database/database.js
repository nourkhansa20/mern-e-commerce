import mongoose from 'mongoose'

await mongoose
    .connect("mongodb+srv://nourkhansa7:1RXm9gw4gBOhiPgT@protopia.kurwnz6.mongodb.net/mern-e-commerce?retryWrites=true&w=majority&appName=protopia")
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err))