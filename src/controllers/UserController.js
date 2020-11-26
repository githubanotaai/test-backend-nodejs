import bcrypt from 'bcryptjs';
import User from '../models/User';

class UserController {
    async index(req, res){
        const users = await User.find();
        return res.json(users);
    }

    async show(req, res){
        const { id } = req.params;
        const user = await User.findOne(id);

        if (!user) {
            return res.status(401).json({error: "User not found!"})
        }

        return res.json(user);
    }

    async create(req, res){
        const { name, email, password } = req.body;
        const created = new Date();
        const updated = new Date(); 

        let user = findOne({ email });

        if (user){
            return res.status(401).json({ error: 'User already exists' });
        }

        const passwordHash = await bcrypt.hash(password, 8);

        user = await User.create({
            name,
            email,
            password: passwordHash,
            created,
            updated
        });

        delete user.password;

        return res.json(user);

    }
}

export default UserController;