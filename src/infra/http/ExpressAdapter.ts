import express, { Request, Response } from "express";

import Http from "../../domain/http/Http";

export default class ExpressAdapter implements Http {
    app: any;
    constructor() {
        this.app = express();
    }

    use(fn: any): void {
        this.app.use(fn);
    }

    listen(port: number, fn: any = null): void {
        this.app.listen(port);
        if (fn) {
            fn();
        }
    }

    on(url: string, method: string, fn: any): void {
        this.app[method](url, async (req: Request, res: Response) => {
            const result = await fn(req.params, req.body);
            res.json(result);
        });
    }
}
