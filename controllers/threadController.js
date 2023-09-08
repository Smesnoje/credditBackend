const mongoose = require('mongoose')
const thread = require('../models/threadModel')


const createNewThread = async (req, res, next) => {
    const data = req.body

    const newThread = new thread({
        name: data.name,
        owner: data.userId,
    })

    newThread.members.push(data.userId)

    try{
        await newThread.save()
        console.log(newThread)
        res.status(201).send("Thread created!")
    } catch (err) {
        console.log('something went wrong while creating the thread')
        console.log(err)
    }
}


const getThread = async (req, res, next) => {
    const data = req.body

    const threadName = data.name

    let fetchedThread
    try {
        fetchedThread = await thread.findOne({name: threadName}).exec()

        if (fetchedThread) {
            res.status(200).send(fetchedThread)
        } else {
            res.status(404).send("Thread not found.")
        }

    } catch (err) {
        console.log(err)
    }
}

exports.createNewThread = createNewThread
exports.getThread = getThread