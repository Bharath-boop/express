import { findIndex } from '../common/helper.js'
import DB_CONFIG from '../config/config.js'
import mongodb, { MongoClient } from 'mongodb'

const user = []
const client = new MongoClient(DB_CONFIG.DB_URL)


const getAllUsers = async (req, res) => {
    await client.connect()
    try {
        const db = await client.db(DB_CONFIG.DB_NAME)
        const user = await db.collection('user').find().toArray()
        res.status(200).send({
            message: "users data sessefully fatching",
            user
        })

    } catch (error) {
        res.status(500).send({
            message: "internal server error"
        })
    }
    finally {
        client.close()
    }
}

const getUserById = async (req, res) => {
    await client.connect()
    try {
        const db = await client.db(DB_CONFIG.DB_NAME)
        const user = await db.collection('user').findOne({ _id: new mongodb.ObjectId(req.params) })
        res.status(200).send({
            message: "users data sessefully fatching",
            user
        })

    } catch (error) {
        res.status(500).send({
            message: "internal server error"
        })
    }
    finally {
        client.close()
    }
}

const addUser = async (req, res) => {
    await client.connect()
    try {
        const db = await client.db(DB_CONFIG.DB_NAME)
        const user = await db.collection('user').findOne({ email: req.body.email })
        if (!user) {
            let newUser = await db.collection('user').insertOne(req.body)
            res.status(200).send({
                message: "add data seccesfull"
            })
        }
        else {
            res.status(400).send({
                message: `this ${req.body.email} alreay exect`
            })

        }

    } catch (error) {
        res.status(500).send({
            message: "internal server error"
        })
    }
    finally {
        client.close()
    }
}

const editUser = async (req, res) => {
    await client.connect()
    try {
        const db = await client.db(DB_CONFIG.DB_NAME)
        const user = await db.collection('user').findOne({ _id: new mongodb.ObjectId(req.params) })
        if (user) {
            await db.collection('user').updateOne({ _id: new mongodb.ObjectId(req.params) }, { $set: req.body })

            res.status(200).send({
                message: "users data sessefully fatching",
            })
        }
        else {
            res.status(400).send({
                message: "invalid user",

            })
        }

    } catch (error) {
        res.status(500).send({
            message: "internal server error"
        })
    }
    finally {
        client.close()
    }
}

const deleteUser = async (req, res) => {
    await client.connect()
    try {
        const db = await client.db(DB_CONFIG.DB_NAME)
        const user = await db.collection('user').findOne({ _id: new mongodb.ObjectId(req.params) })
        if (user) {
            await db.collection('user').deleteOne({ _id: new mongodb.ObjectId(req.params) })
            res.status(200).send({
                message: "users deleted sessefully fatching",

            })
        }
        else {
            res.status(400).send({
                message: "invalid user id",

            })
        }
    } catch (error) {
        res.status(500).send({
            message: "internal server error"
        })
    }
    finally {
        client.close()
    }
}


export default {
    getAllUsers,
    getUserById,
    addUser,
    editUser,
    deleteUser

}