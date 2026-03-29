const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// REGISTER
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        // check if user already exists
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' })
        }

        // hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // create the user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })

        // generate token
        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        )

        res.status(201).json({
            message: 'User registered successfully',
            token
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// LOGIN
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        // check if user exists
        const userExists = await User.findOne({ email })
        if (!userExists) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        // check if password matches
        const isMatch = await bcrypt.compare(password, userExists.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        // generate token
        const token = jwt.sign(
            { id: userExists._id, role: userExists.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        )

        res.status(200).json({
            message: 'Login successful',
            token
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { register, login }


