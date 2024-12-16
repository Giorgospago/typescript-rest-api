import { Request, Response } from "express";
import Product from "../models/Product";

export default class ProductController {

    static async index(req: Request, res: Response) {
        const products = await Product.find();
        return res.json({
            message: "List of products",
            products: products
        });
    }

    static async create(req: Request, res: Response) {
        const slug: string = req.body.title
            .toLowerCase()
            .replace(/ /g, "-");
    
        const product = new Product({
            title: req.body.title,
            description: req.body.description,
            slug: slug,
            image: req.body.image,
            price: req.body.price
        });
    
        product.save();
    
        return res.status(201).json({
            message: "Product created"
        });
    }

    static async show(req: Request, res: Response) {
        try {
            const product = await Product.findById(req.params.id);
            return res.json({
                message: "Show one product",
                product: product
            });
        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }

    static async update(req: Request, res: Response) {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body);
        if (!product) {
            return res.status(400).json({
                message: "Product not found"
            });
        }
        
        return res.json({
            message: `Product: ${product.title} updated`
        });
    }

    static async deleteProduct(req: Request, res: Response) {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(400).json({
                message: "Product not found"
            });
        }

        return res.json({
            message: `Product: ${product.title} deleted`
        });
    }
}
