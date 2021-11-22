import express from 'express'
import app from './app'
const config = require('config')

const port = config.PORT || 1337
const server = app(express())

server.listen(port, () => {
  console.log(`express app is started on port ${port}`)
})

export default server
