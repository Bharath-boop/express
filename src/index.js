// const express=require('express') common js
import express from "express" //modual js
import appRoute from './routers/index.js'
const app = express()
const PORT = process.env.PORT || 10000

app.use(express.json())
app.use('/', appRoute)

app.listen(PORT, () => console.log(`APP LISTENING TO ${PORT}`))