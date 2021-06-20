import path from 'path'
import fs from 'fs'
import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Helmet } from 'react-helmet'
import App from '../src/containers/App'

const PORT = 8080
const app = express()

app.get('/*', (req, res) => {
    const context = {}
    const appComponent = ReactDOMServer.renderToString(<App />)

    const helment = Helmet.renderStatic()

    const indexFile = path.resolve('./build/index.html')
    fs.readFile(indexFile, 'utf-8', (err, data) => {

        if (err) {
            console.log('Something went wrong: ', err);
            return res.status(500).send('Oops, better luck next time!')
        }

        data = data.replace('<div id="root"></div>', `<div id="root">${appComponent}</div>`)
        data = data.replace('<meta name="helmet"/>',
            `${helmet.title.toString()}${helmet.meta.toString()}`)
    })

})

app.listen(PORT, () => {
    console.log('App listening on port: ', PORT);
})