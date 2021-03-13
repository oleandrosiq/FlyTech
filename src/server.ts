import { app } from './app'
import express from 'express'
import ejs from 'ejs'
import path from 'path'

app.use(express.static(path.join('public')))
app.set('views', path.join('public'))
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')

app.listen(3000, () => {
    console.log("Server is running!")
})