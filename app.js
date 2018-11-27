const express = require('express')


const schema = require('./schema')

const expressGraphQL = require('express-graphql')


const app = express()


const port = 3000 || process.env.PORT


app.use('/graphql', expressGraphQL({
  schema,
  graphiql:true
}))







app.listen(port, () => {
  console.log('server running on port ' + port)
})
