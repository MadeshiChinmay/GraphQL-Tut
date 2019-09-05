//DEFINING THE DATA STRUCTURE HERE
// Basically we want to tell how the data is related inside of it
// It Tells basically how is the DATA of Application is defined...
const _=require('lodash')//required for static data
const axios=require('axios')

const graphql=require('graphql')
const{
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema
}=graphql;

/*HARD CODED DATA*/
const users = [
    {id:"23",firstName:"Bill",age:20},
    {id:"47",firstName:"Samantha",age:32}
];


const UserType/*Tells the graphql about how the user object is
defined */ = new GraphQLObjectType({//Represents User in GraphQL Structure
    name: 'User',
    fields:{
        //Properties of User
        id:{type:GraphQLString},
        firstName:{type:GraphQLString},
        age:{type:GraphQLInt}
    }
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        user : { //THIS BASICALLY LOOKS UP FOR THE 
            //USER WITH GIVEN ID
            type: UserType,
            args: {id:{type:GraphQLString}},
            resolve(parentValue,args){
                /*resolve handles promises automatically */

                //HERE WE ACTUALLY GO INTO THE DATASTORE/DATABASE
                //AND GRAB THE DATA AND RETURNING IT
                //args : it gets passed with the args field in the RootQuery
            /*--    return _.find(users,{id:args.id})  ---*///lodash

                /*WE CAN ALSO SEND PROMISES TO THE GRAPHQL
                SERVER AND IT SENDS OUT THE DATA AFTER THE 
                PROMISE GETS RESOLVED AND AFTER THAT GRAPHQL
                RETURNS DATA TO US (AUTOMATIC HAPPENS )...IT HELPS US TO ACCESS DATA
                ASYNCHRONOUSLY FROM OUTSIDE API.*/
                return axios.get(`http://localhost:3000/users/${args.id}`)
                .then((response)=>{return response.data})//this needs to be done because
                //graphql doesnot know that the returned promised data is in data nesting
            }
        }
    }
})

module.exports=new GraphQLSchema({
    query: RootQuery
})


//ROOT QUERY : Root Query Is A Type of Entry Point Inside the GraphQL structure