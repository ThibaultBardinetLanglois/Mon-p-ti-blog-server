const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  fileUpload = require('express-fileupload'),
  helmet = require('helmet'),
  morgan = require('morgan'),
  cliColor = require('cli-color'),
  utils = require('./utils/utils');


// Environnement variables
require('dotenv').config({ path: './config/.env' })

// database
require('./config/database')

// Cors options
const corsOptions = {
  "origin": "http://localhost:3000",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE"
}

// Configure morgan to have a render of the request-response in the console
morgan
  .token('intro', () => cliColor.magenta('\n-------------------------------\nMorgan description :\n-------------------------------'))
  .token('referer', (req) => req.get('Referer'))
  .token('host', (req) => req.get('host'))
  .token('hostname', (req) => req.hostname)
  .token('req-params', (req) => JSON.stringify(req.params))
  .token('req-body', (req) => JSON.stringify(req.body))
  .token('request-headers-content-type', (req) => req.headers['content-type'])
  .token('full-url', (req) => {
    const { protocol, originalUrl, } = req,
      host = req.get('host');
    return `${protocol}://${host}${originalUrl}`
  })
  .token('status-code', (req, res) => {
    if (res.statusCode >= 500) {
      return cliColor.red(res.statusCode)
    } else if (res.statusCode >= 400) {
      return cliColor.yellow(res.statusCode)
    } else if (res.statusCode >= 300) {
      return cliColor.cyan(res.statusCode)
    } else if (res.statusCode >= 200) {
      return cliColor.green(res.statusCode)
    } else {
      return cliColor.white(res.statusCode)
    }
  })
  .token('res-body', (req, res) => res.body)
  .token('formatted-date', () => utils.formatDate(new Date(Date.now())))

// routes
const api = require('./routes/api.routes')

app.use(express.static(__dirname + '/public'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cors(corsOptions))
  .use(morgan(
    `\n:intro\n
${cliColor.cyan('Referer :')}  :referer
${cliColor.cyan('Host :')} :host
${cliColor.cyan('Hostname :')} :hostname
${cliColor.cyan('Headers request content type :')} :request-headers-content-type
${cliColor.cyan('Remote address :')} :remote-addr
${cliColor.cyan('Http version :')} :http-version
${cliColor.cyan('Http method :')} :method
${cliColor.cyan('Url :')} :url
${cliColor.cyan('Full url :')} :full-url
${cliColor.cyan('Status :')} :status-code
${cliColor.cyan('Request params :')}  :req-params
${cliColor.cyan('Request body :')} :req-body
${cliColor.cyan('Response body length :')} :res[content-length]
${cliColor.cyan('Response time :')} :response-time ms
${cliColor.cyan('Total time for beginning-finishing request-response :')} :total-time[digits] ms
${cliColor.cyan('User agent :')} :user-agent
${cliColor.cyan('Date :')} :formatted-date
\n`
  ))
  .use(fileUpload({
    createParentPath: true,
    limits: {fileSize: 200000}
  }))
  .use(helmet.hidePoweredBy({ setTo: 'Drupal 5.7.0' }))
  .use(helmet.xssFilter())
  .use(helmet.frameguard({ action: 'deny' }))
  .use(helmet.noSniff())
  .use('/api', api)


app.listen(process.env.SERVER_PORT, () => {
  console.log(`Backend application is listennig on the url http://localhost:${process.env.SERVER_PORT}`)
})
