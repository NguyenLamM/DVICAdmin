const express = require('express')
const consola = require('consola')
const mongodb = require('mongodb')
const bodyParser = require('body-parser')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const MongoClient = require('mongodb').MongoClient;


// Middleware


const posts = require('./routes/api/posts');
app.use(bodyParser.json());
app.use('/api/posts', posts);


// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
