import path from 'path'
import fs from 'fs'
import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

const PORT = 8080
const app = express()

app.listen(port, () => {
    console.log('App listening on port: ', port);
})