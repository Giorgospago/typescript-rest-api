import { Request, Response } from "express";

export default class AppController {

    static index(req: Request, res: Response) {
        return res.json({
            message: "Welcome to Typescript Rest API"
        });
    }

    static notFound(req: Request, res: Response) {
        return res.status(404).json({
            message: "Route not found"
        });
    }
}
