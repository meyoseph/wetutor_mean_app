require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Client } = require('@elastic/elasticsearch');
const { Kafka } = require("kafkajs");

DB_URL= process.env.DB_URL;
const profileRoutes = require('./routes/profiles_routes');
const userRoutes = require('./routes/user_routes');
const adminRoutes = require('./routes/admin_routes');
const app = express();
const client = new Client({
  node: process.env.ES_ADDRESS,
  auth: {
      username: process.env.ES_USERNAME,
      password: process.env.ES_PASSWORD
  }
})

mongoose.connect(DB_URL).then(() => {
  console.log('connected to db...');
}).catch(() => {
  console.log('connection failed...')
});

app.use(bodyParser.json());
app.use(cors());
app.use('/api/profiles', profileRoutes)
app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)

// const kafka = new Kafka({
//   clientId: process.env.SEARCH_SERVICE_APP,
//   brokers: [process.env.KAFKA]
// });

// const gid = process.env.SEARCH_SERVICE_APP;
// const consumer = kafka.consumer({ groupId: gid + Date.now() });
// const producer = kafka.producer();

// const profile = [
//   {"firstname":"Erv","lastname":"Baynham","gender":"male","age":21,"educationlevel":"BCS","language":"English","status":"active", "phonenumber":"602-646-7389", "mainsubject":"Ruby"},
//   {"firstname":"Letty","lastname":"Melanaphy","gender":"male","age":21,"educationlevel":"BCS","language":"English","status":"active", "phonenumber":"913-804-2475", "mainsubject":"Golang"},
//   {"firstname":"Gilemette","lastname":"Abramof","gender":"male","age":28,"educationlevel":"BCS","language":"English","status":"active", "phonenumber":"680-675-2649", "mainsubject":"java"},
//   {"firstname":"Winna","lastname":"Limb","gender":"male","age":21,"educationlevel":"BCS","language":"English","status":"active", "phonenumber":"185-933-5761", "mainsubject":"React"},
//   {"firstname":"Hartwell","lastname":"Szantho","gender":"female","age":22,"educationlevel":"BCS","language":"English","status":"active", "phonenumber":"925-152-3590", "mainsubject":"Angular"},
//   {"firstname":"Kore","lastname":"Selcraig","gender":"male","age":21,"educationlevel":"BCS","language":"English","status":"active", "phonenumber":"975-568-1231", "mainsubject":"Node"},
//   {"firstname":"Marylee","lastname":"McBeith","gender":"female","age":21,"educationlevel":"BCS","language":"English","status":"active", "phonenumber":"706-316-2659", "mainsubject":"Scala"},
//   {"firstname":"Michail","lastname":"Elsbury","gender":"male","age":21,"educationlevel":"BCS","language":"English","status":"active", "phonenumber":"437-725-0429", "mainsubject":"Erlang"},
//   {"firstname":"Suki","lastname":"Kop","gender":"female","age":25,"educationlevel":"BCS","language":"English","status":"active", "phonenumber":"148-569-7449", "mainsubject":"Elixir"},
//   {"firstname":"Jo","lastname":"Blogg","gender":"male","age":24,"educationlevel":"BCS","language":"English","status":"active", "phonenumber":"252-117-1716", "mainsubject":"Reactnative"}]



//   const usertuts = [{"id":1,"email":"goldis0@hud.gov","password":"12345","location":[],"user_type": "tutor","profile": profile[0]},
//   {"id":2,"email":"sclash1@wikimedia.org","password":"12345","location":[],"user_type": "tutor","profile": profile[1]},
//   {"id":3,"email":"akiefer2@si.edu","password":"12345","location":[],"user_type": "tutor","profile": profile[2]},
//   {"id":4,"email":"bdumelow3@berkeley.edu","password":"12345","location":[],"user_type": "tutor","profile": profile[3]},
//   {"id":5,"email":"eharbar4@csmonitor.com","password":"12345","location":[],"user_type": "tutor","profile": profile[4]},
//   {"id":6,"email":"gwebermann5@microsoft.com","password":"12345","location":[],"user_type": "tutor","profile": profile[5]},
//   {"id":7,"email":"tthornber6@examiner.com","password":"12345","location":[],"user_type": "tutor","profile": profile[6]},
//   {"id":8,"email":"mamanger7@usatoday.com","password":"12345","location":[],"user_type": "tutor","profile": profile[7]},
//   {"id":9,"email":"bfarenden8@live.com","password":"12345","location":[],"user_type": "tutor","profile": profile[8]},
//   {"id":10,"email":"rfahy9@weebly.com","password":"12345","location":[],"user_type": "tutor","profile": profile[9]}]

//const run = async() => {
  // await consumer.connect();
  // await consumer.subscribe({
  //   topic: process.env.SEARCH_SERVICE_TOPIC,
  //   fromBeginning: true
  // })

// await consumer.run({
//     eachMessage: async({ topic, partion, message }) => {
//         console.log("Recieved message topic: " + topic + "message: " + message.value.toString());
//         try {
//             const data = JSON.parse(message.value.toString());
//             client.index({
//               index: process.env.ELASTICINDEX,
//               id: data._id,
//               body: data
//             }).then(res => {
//               console.log(topic, JSON.parse(message.value.toString()));
//             }).catch(err => console.log(err));
//         } catch (error) {
//           console.log("unable to serialize object: " + message.value.toString());
//         }
//     }
//   });

//   await producer.connect();
//   setInterval(async () => {
//     try{
//       await producer.send({
//         topic: process.env.SEARCH_SERVICE_TOPIC,
//         messages: usertuts
//       })
//     }catch(err){
//       console.log("am here")
//       console.log(err)
//     }
//   }, 1000)
// }

// run().then(() => {
//   console.log("Done")
// }, err => { console.log(err) });

// const profile = [
//   {"firstname":"Erv","lastname":"Baynham","gender":"male","age":21,"educationlevel":"BCS","language":"English","status":"active", "phonenumber":"602-646-7389", "mainsubject":"Ruby"},
//   {"firstname":"Letty","lastname":"Melanaphy","gender":"male","age":21,"educationlevel":"BCS","language":"English","status":"active", "phonenumber":"913-804-2475", "mainsubject":"Golang"},
//   {"firstname":"Gilemette","lastname":"Abramof","gender":"male","age":28,"educationlevel":"BCS","language":"English","status":"active", "phonenumber":"680-675-2649", "mainsubject":"java"},
//   {"firstname":"Winna","lastname":"Limb","gender":"male","age":21,"educationlevel":"BCS","language":"English","status":"active", "phonenumber":"185-933-5761", "mainsubject":"React"},
//   {"firstname":"Hartwell","lastname":"Szantho","gender":"female","age":22,"educationlevel":"BCS","language":"English","status":"active", "phonenumber":"925-152-3590", "mainsubject":"Angular"},
//   {"firstname":"Kore","lastname":"Selcraig","gender":"male","age":21,"educationlevel":"BCS","language":"English","status":"active", "phonenumber":"975-568-1231", "mainsubject":"Node"},
//   {"firstname":"Marylee","lastname":"McBeith","gender":"female","age":21,"educationlevel":"BCS","language":"English","status":"active", "phonenumber":"706-316-2659", "mainsubject":"Scala"},
//   {"firstname":"Michail","lastname":"Elsbury","gender":"male","age":21,"educationlevel":"BCS","language":"English","status":"active", "phonenumber":"437-725-0429", "mainsubject":"Erlang"},
//   {"firstname":"Suki","lastname":"Kop","gender":"female","age":25,"educationlevel":"BCS","language":"English","status":"active", "phonenumber":"148-569-7449", "mainsubject":"Elixir"},
//   {"firstname":"Jo","lastname":"Blogg","gender":"male","age":24,"educationlevel":"BCS","language":"English","status":"active", "phonenumber":"252-117-1716", "mainsubject":"Reactnative"}]


//   const usertuts = [{"id": "1","email":"goldis0@hud.gov","password":"12345","location":[],"user_type": "tutor","profile": profile[0]},
//   {"id":"2","email":"sclash1@wikimedia.org","password":"12345","location":[],"user_type": "tutor","profile": profile[1]},
//   {"id":"3","email":"akiefer2@si.edu","password":"12345","location":[],"user_type": "tutor","profile": profile[2]},
//   {"id":"4","email":"bdumelow3@berkeley.edu","password":"12345","location":[],"user_type": "tutor","profile": profile[3]},
//   {"id":"5","email":"eharbar4@csmonitor.com","password":"12345","location":[],"user_type": "tutor","profile": profile[4]},
//   {"id":"6","email":"gwebermann5@microsoft.com","password":"12345","location":[],"user_type": "tutor","profile": profile[5]},
//   {"id":"7","email":"tthornber6@examiner.com","password":"12345","location":[],"user_type": "tutor","profile": profile[6]},
//   {"id":"8","email":"mamanger7@usatoday.com","password":"12345","location":[],"user_type": "tutor","profile": profile[7]},
//   {"id":"9","email":"bfarenden8@live.com","password":"12345","location":[],"user_type": "tutor","profile": profile[8]},
//   {"id":"10","email":"rfahy9@weebly.com","password":"12345","location":[],"user_type": "tutor","profile": profile[9]}]


// const seedme = () => {
//   for(let i = 0; i < usertuts.length; i++){
//     client.index({
//       index: process.env.ELASTICINDEX,
//       id: usertuts[i].id,
//       body: usertuts[i]
//     }).then(res => {
//       console.log(res);
//     }).catch(err => console.log(err));
//   }
// }

// seedme();

module.exports = app;
