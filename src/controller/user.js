import { findIndex } from '../common/helper.js'
const user = [
    {
        id: 1,
        name: "Bharath",
        email: "bharath@gmail.com",
        password: "123",
        status: true,
        role: "user"
    }, {
        id: 2,
        name: "kumar",
        email: "kumar@gmail.com",
        password: "1234566",
        status: true,
        role: "user"
    }, {
        id: 3,
        name: "ajith",
        email: "aJITH@gmail.com",
        password: "1234566",
        status: true,
        role: "user"
    }
]



const getAllUsers = (req, res) => {
    try {
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

const getUserById = (req, res) => {
    try {
        const { id } = req.params
        let index = findIndex(user, id)
        if (index != -1) {
            res.status(200).send({
                message: "fetching data seccesfull",
                user: user[index]
            })
        }
        else {
            res.status(400).send({
                message: "invalid user id"
            })
        }

    } catch (error) {
        res.status(500).send({
            message: "internal server error"
        })
    }
}

const addUser = (req, res) => {
    try {
        let id = user.length ? user[user.length - 1].id + 1 : 1
        req.body.id = id
        user.push(req.body)
        res.status(200).send({
            message: "add data seccesfull"
        })

    } catch (error) {
        res.status(500).send({
            message: "internal server error"
        })
    }
}

const editUser = (req, res) => {
    try {
        const { id } = req.params
        let index = findIndex(user, id)

        if (index !== -1) {
            req.body.id = Number(id)
            user.splice(index, 1, req.body)
            res.status(200).send({
                message: "edit data seccesfull",

            })
        }
        else {
            res.status(400).send({
                message: "invalid user id"
            })
        }

    } catch (error) {
        res.status(500).send({
            message: "internal server error"
        })
    }
}

const deleteUser = (req, res) => {
    try {
        const { id } = req.params
        let index = findIndex(user, id)
        if (index !== -1) {
            user.splice(index, 1)
            res.status(200).send({
                message: "delete data seccesfull",

            })
        }
        else {
            res.status(400).send({
                message: "invalid user id"
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