const path = require('path')
const express = require('express')
const morgan = require('morgan')
const PORT = process.env.PORT || 8080
const app = express()
module.exports = app

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, '..', 'public')))

app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  )


app.post("https://language.googleapis.com/v1/documents:analyzeSentiment?key=AIzaSyAo1NXB2azJ9cdWAfNmo5Mp9fpfF6t3hfE", {
  headers: {
    method: 'POST',
    body: JSON.stringify({
      "document":{
      "type":"PLAIN_TEXT",
      "content":"Inception is one of the best movies of all time. I think everyone should watch it."
      },
      "encodingType": "UTF8"
      }),
      headers: {'Content-Type': 'application/json'}

  }
} async(req, res, next) => {
  try {
    req.body()
  } catch (error) {
    next(error)
  }
})



app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found')
    err.status = 404
    next(err)
  } else {
    next()
  }
})

app.use((err, req, res, next) => {
  //added to prevent huge console logs for npm test
  if (process.env.NODE_ENV !== 'test') {
    console.error(err)
    console.error(err.stack)
  }
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})


