const express = require('express')
const app =  express()
const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/'
const {MongoClient} = require('mongodb');
const client = new MongoClient(uri, {useNewUrlParser:true, useUnifiedTopology: true });
const server = require('http').createServer(app);
const io = require('socket.io')(server,{cors:{origin:'*'}})


// const {
//     createTable,
//     readTable,
//     deleteTable,
//     updateTable,
//     listTable
// } = createhandlers(components)9


mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {console.log('connected to DB')}
    else{console.log(err)}
});

server.listen(9000,() => console.log('serever started'))

io.on('connection',async (socket)=>{
    socket.on("create", async (info)=>{
        await client.connect()
        await client.db('test_task_d').collection('main').insertOne({_id:info.id, user_name:info.name, surename:info.surename})
        console.log(info)
    });
//   socket.on("table:read", readTable);
  socket.on("update", async(info)=>{
        await client.connect()
        await client.db('test_task_d').collection('main').updateOne({_id:info.id},{$set:{ user_name:info.name, surename:info.surename}})
        console.log(info)
    });
    socket.on("delete", async(info)=>{
        await client.connect()
        await client.db('test_task_d').collection('main').deleteOne({_id:info.id})
        console.log(info)
    });

});


const createTable = function(info){
    console.log(info)
};
