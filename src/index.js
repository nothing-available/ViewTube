import connectDB from './db/db_connect.js';
import dotenv from 'dotenv';
import { app } from './app.js';

dotenv.config({
    path: "./.env"
});

connectDB().then(() => {
    app.on("error", (error) => {
        console.log("Server error: ", error);
        throw error;
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })

})
    .catch(() => {
        console.log("MongooDB connection failed", error)
    })