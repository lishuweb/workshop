require("dotenv").config();

const url = process.env.NODE_ENV === "test" 
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

    // console.log(process.env.MONGODB_URI, "hello");

const PORT = process.env.PORT;
module.exports = { url, PORT };