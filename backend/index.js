const dotenv  = require('dotenv')

const mongoose  = require('mongoose')

dotenv.config()


const URI = process.env.URI
const connectDb = async() => {
    try {
        const connect = await mongoose.connect(URI)
        console.log("database connected");
    } catch (error) {
        console.log(error);
    }
}
connectDb()


const app = require("./app")
app.listen(8000, '0.0.0.0', () => {
    console.log('Server is running on http://192.168.232.78:5000');
  })