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

const kafka = new Kafka({
  clientId: process.env.SEARCH_SERVICE_APP,
  brokers: [process.env.KAFKA]
});

const gid = process.env.SEARCH_SERVICE_APP;
const consumer = kafka.consumer({ groupId: gid + Date.now() });

const run = async() => {
  await consumer.connect();
  await consumer.subscribe({
    topic: process.env.SEARCH_SERVICE_TOPIC,
    fromBeginning: true
  })

await consumer.run({
    eachMessage: async({ topic, partion, message }) => {
        console.log("Recieved message topic: " + topic + "message: " + message.value.toString());
        try {
            const data = JSON.parse(message.value.toString());
            client.index({
              index: process.env.ELASTICINDEX,
              id: data._id,
              body: data
            }).then(res => {
              console.log(topic, JSON.parse(message.value.toString()));
            }).catch(err => console.log(err));
        } catch (error) {
          console.log("unable to serialize object: " + message.value.toString());
        }
    }
  });
}

run().then(() => {
  console.log("Done")
}, err => { console.log(err) });

module.exports = app;
