import path from 'path'
import fs from 'fs'
import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from '../src/containers/App'

const PORT = 8080
const app = express()

app.get('/*', (req, res) => {
    const context = {}
    const appComponent = ReactDOMServer.renderToString(<App />)

    const indexFile = path.resolve('./build/index.html')
    fs.readFile(indexFile, 'utf-8', (err, data) => {

        if (err) {
            console.log('Something went wrong: ', err);
            return res.status(500).send('Oops, better luck next time!')
        }

        data = data.replace('<div id="root"></div>', `<div id="root">${appComponent}</div>`)
    })

})

app.listen(port, () => {
    console.log('App listening on port: ', port);
})