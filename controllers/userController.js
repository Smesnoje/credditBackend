const mongoose = require('mongoose')
const user = require('../models/userModel')

const createNewUser = async (req, res, next) => {
    const data = req.body

    const newUser = new user({
        username: data.username,
        password: data.password,
        email: data.email,
        profilePicture: data.profilePicture,
    })

    try{
        await newUser.save()
        console.log(newUser)
    } catch (err) {
        console.log('something went wrong while creating the user')
    }
    res.status(201).send("User created!")
}

exports.createNewUser = createNewUser