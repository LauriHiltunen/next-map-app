const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const app = express() 

const HENKILOT = [{id:1,name:"Jouni Dolonen",number:"040-1234567"},{id:2,name:"Jaana Dolonen",number:"040-2345678"},{id:3,name:"Jaakko Seppä",number:"040-3456789"},{id:4,name:"Jaani Jansson",number:"040-4567890"}]

const HTMLDOCUMENT = (body) => {
    let html = `<!DOCTYPE html>
<html lang="fi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Puhelinluettelo</title>
</head>
<body>
    ${body}
</body>
</html>`
    return html
}

app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.method(req, res) === "POST" ? JSON.stringify(req.body) : ""
    ].join(' ')
  }))
app.use(cors())

app.use(express.json())

app.get("/api/henkilot",(req,res) => {
    res.json(HENKILOT)
})
app.get("/info",(req,res) => {
    res.send(HTMLDOCUMENT(`<p>Puhelinluettelossa on ${HENKILOT.length()} henklön tiedot</p><p>${new Date().getUTCDate()}</p>`))
})

PORT = 3001
app.listen(PORT, () => {
    console.log(`Kuunnellaan porttia ${PORT} osoite localhost:${PORT}/api/henkilot/`)
})