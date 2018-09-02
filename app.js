const express = require('express')
const app = express()

//Connect route files
const colourRoutes = require(__dirname+'/colour')

//Use route files
app.use('/', colourRoutes)

//Start Server
const PORT = process.env.PORT || 9090
app.listen(PORT, () => console.log('Running on port ' + PORT))