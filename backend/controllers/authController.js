const Joi = require('joi');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const JwtService = require('../services/jwtService');
const Token = require('../models/token');

class AuthController {
    async register(req, res) {
        //Checklist
        //validate the request
        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(100).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            cnf_password: Joi.ref('password')
        })
        try {
            const { error } = registerSchema.validate(req.body);
            if (error) {
                return res.json(error.message);
            }
        } catch (err) {
            return res.json({ message: err.message });
        }

        //check user already in the db
        try {
            const user = await User.find({ email: req.body.email });
            if (user.length > 0) {
                return res.status(409).json({ status: "user already exist" })
            }
            // return new Error("Email already exist")
        } catch (err) {
            return res.json(err);
        }
        //create new user
        const { name, email, password, type } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
        })
        let accessToken, refreshToken;
        try {
            accessToken = JwtService.sign({ _id: user._id });
            refreshToken = JwtService.sign({ _id: user._id }, '1y', process.env.REFRESH_TOKEN)

        } catch (err) {
            return res.json(err);
        }
        //store token;
        Token.create({
            token: refreshToken
        })
        //send token as response
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });
        res.json(user);
    }
    async login(req, res) {
        //validate request
        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        //check if user matches
        let user
        let _id;
        try {
            user = await User.find({ email: req.body.email });
            if (!user) {
                return res.status(404).json({ message: " User does not found!" });
            }
            // type = user[0].type;
            _id = user[0]._id;
        } catch (err) {
            return res.json(err)
        }
        // check user entered the correct password
        try {
            const result = await bcrypt.compare(req.body.password, user[0].password);
            if (!result) {
                return res.status(401).json({ message: 'Please enter the correct password' })
            }

        } catch (err) {
            return res.json(err.message)
        }

        //create token
        let accessToken, refreshToken;
        try {

            accessToken = JwtService.sign({ _id });
            refreshToken = JwtService.sign({ _id }, '1y', process.env.REFRESH_TOKEN)
            // accessToken = JwtService.sign({ _id: user._id, type: user.type });
            // refreshToken = JwtService.sign({ _id: user._id, type: user.type }, '1y', process.env.REFRESH_TOKEN)

        } catch (err) {
            return res.json(err);
        }
        //store token;
        Token.create({
            token: refreshToken
        })
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });
        //send token as response
        res.json(user);

    }
    async logout(req, res) {
        // validation
        const refreshSchema = Joi.object({
            refresh_token: Joi.string().required(),
        });
        const { refreshToken } = req.cookies;
        const { error } = refreshSchema.validate({ refresh_token: refreshToken });

        if (error) {
            return res.json(error);
        }

        try {
            await Token.deleteOne({ token: refreshToken });
        } catch (err) {
            return next(new Error('Something went wrong in the database'));
        }
        // delete cookies
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        res.json({ status: 1 });
    }
}

module.exports = new AuthController();