import express, {Express} from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import AppController from './controllers/AppController';
import ProductController from './controllers/ProductController';

const main = async () => {
    // Connect to MongoDB
    try {
        await mongoose.connect("mongodb://localhost:27017/ecommerce");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB.");
        console.log(error.message);
    }


    const app: Express = express();

    app.listen(3030, () => {
        console.log("Server is running on port 3030");
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    app.get("/", AppController.index);

    app.get("/products", ProductController.index);
    app.post("/products", ProductController.create);
    app.get("/products/:id", ProductController.show);
    app.put("/products/:id", ProductController.update);
    app.delete("/products/:id", ProductController.deleteProduct);

    app.all("*", AppController.notFound);
    
};

main();
