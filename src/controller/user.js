import userModel from '../models/user.js'

const getAllUsers = async (req, res) => {
    try {
        const user = await userModel.find()
        res.status(200).send({
            message: "users data sessefully fatching",
            user
        })

    } catch (error) {
        res.status(500).send({
            message: "internal server error"
        })
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.params.id })
        res.status(200).send({
            message: "users data sessefully fatching",
            user
        })

    } catch (error) {
        res.status(500).send({
            message: "internal server error",
            error: error.message
        })
    }
}

const addUser = async (req, res) => {
    try {

        const user = await userModel.findOne({ email: req.body.email })
        if (!user) {
            let newUser = await userModel.create(req.body)
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
            message: "internal server error",
            error: error.message
        })
    }
}

const editUser = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.params.id })
        if (user) {
            user.name = req.body.name,
                user.email = req.body.email,
                user.password = req.body.password,
                user.status = req.body.status,
                user.role = req.body.role
            await user.save()

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
            message: "internal server error",
            error: error.message
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.params.id })
        if (user) {
            await userModel.deleteOne({ _id: req.params.id })
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
}


export default {
    getAllUsers,
    getUserById,
    addUser,
    editUser,
    deleteUser

}