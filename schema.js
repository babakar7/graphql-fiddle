const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')

// hardcoded data

var customers = [{id:'1', name:"John Doe", email:"john@google.com", age:27},
{id:'2', name:"Jane Doe", email:"jane@google.com", age:55},
{id:'3', name:"Mary Doe", email:"maryn@google.com", age:20}]

const CustomerType = new GraphQLObjectType({
  name:'Customer',
  fields:()=>({
    id:{type:GraphQLString},
    name:{type:GraphQLString},
    email:{type:GraphQLString},
    age:{type:GraphQLInt}
  })
})

// ROOT QUERY. EVERYTHING CAN GO HERE
const RootQuery = new GraphQLObjectType({
  name:'RootQueryType',
  fields:{
    customer: {
      type:CustomerType,
      args:{
        id:{type:GraphQLString}
      },
      resolve(parentValue, args){
      let found  = customers.find((el)=>{
           return el.id == args.id
        })
        return found
      }
    },

    customers:{
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args){
        return customers
      }
    }

  }

})


const mutation = new GraphQLObjectType({
  name:'Mutation',
  fields:{
    addCustomer:{
      type: CustomerType,
      args:{
        name:{type: new GraphQLNonNull(GraphQLString)},
        email:{type: new GraphQLNonNull(GraphQLString)},
        age:{type: new GraphQLNonNull(GraphQLInt)},
      },

      resolve(parentValue, args){
        customers.push(args)
        return args
      }
    },

    // can add other mutations HERE 
  }
})

// SCHEMA
module.exports = new GraphQLSchema ({
  query:RootQuery,
  mutation
})
