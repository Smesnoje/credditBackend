const mongoose = require('mongoose')
const user = require('../models/userModel')


const createNewUser = async (req, res, next) => {
    const data = req.body

    try {
        const fetchedUserByUsername = await user.findOne({username: data.username}).exec()
        const fetchedUserByEmail = await user.findOne({email: data.email}).exec()
        if (fetchedUserByUsername || fetchedUserByEmail) {
            res.status(409).send("Credentials are not unique!")
            return next()
        }
    } catch (err) {
        console.log(err)
    }

    

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


const getUser = async (req, res, next) => {
    const data = req.body

    const username = data.username

    let fetchedUser
    try {
        fetchedUser = await user.findOne({username: username}).exec()

        if (fetchedUser) {
            res.status(200).send(fetchedUser)
        } else {
            res.status(404).send("User not found!")
        }

    } catch (err) {
        console.log(err)
    }
}

exports.createNewUser = createNewUser
exports.getUser = getUser