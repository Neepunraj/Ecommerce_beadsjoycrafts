import mongoose from "mongoose";
const configOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const connecttoDB = async () => {
    const connectionUrl = 'mongodb+srv://neepushre97:Q1LRrDcJTM8V4nC9@cluster0.8qzxx.mongodb.net/'

    await mongoose.connect(connectionUrl)
        .then(() => console.log('Ecomeerce Database Connected Successfully'))
        .catch((err) => console.log(`Getting Error From Connection${err.message}`))
}

export default connecttoDB;