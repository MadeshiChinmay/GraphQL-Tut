let express=require('express')
let expressGraphQl=require('express-graphql')//Kind of Compatibily Layer
let app=express()
const schema=require('./schema/schema')
// if request to .../GraphQl
app.use('/graphql',expressGraphQl({
    schema:schema,
    graphiql:true//this configuration is solely used to
    // for dev purpose . graphiql is a dev tool and helps
    //in querying against our server. 
    //ADD SCHEMA
    //Basically Here we try to create the graph such as in IMAGE
    //SCHEMA FILE
}))

app.listen(4000,()=>{
    console.log("Listening")
})