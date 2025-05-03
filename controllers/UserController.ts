import { Request, Response } from "express";
import { UserService } from "../services";

export class UserController {
    constructor(private userService: UserService) {}

    /**
     * Get users
     * 
     * @param req Request
     * @param res Response
     */
    async getUsers(req: Request, res: Response) {
        const users = await this.userService.getUsers();
        return res.json(users);
    }

    /**
     * Register new user
     * 
     * @param req Request
     * @param res Response
     */
    async registerUser(req: Request, res: Response) {
        const { name, type } = req.body;

        //validate
        let error = [];
        if (!name || typeof name !== 'string' || /^ *$/.test(name)) {
			error.push('Name invalid!');
		}
		if (!type || typeof type !== 'string' || (type != 'admin' && type != 'client')) {
			error.push('Type invalid! Expected: admin or client');
		}
        if(error.length > 0) return res.status(422).json({ success: false, data: error });

        //register
        const user = await this.userService.registerUser(name, type);
        return res.json(user);
    }
}
