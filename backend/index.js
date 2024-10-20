const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const https = require('https');
const fs = require('fs');
const PORT = 3003;//process.env.PORT || 3000;
// Load SSL certificate and key
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/tinocaffeine.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/tinocaffeine.com/fullchain.pem'),
};

// this is our MongoDB database
const dbRoute =
  'mongodb+srv://mogibanks21:MD!xis36@cluster0.ryuzwnh.mongodb.net/?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true, dbName:'tino' });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mogibanks21:MD!xis36@cluster0.ryuzwnh.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.use(cors());

const emailSchema = new mongoose.Schema({email:'string'});
const newsletter_email = mongoose.model('newsletter_email', emailSchema);

app.get('/saveEmail', async (req, res) => {

  try {
    let email = req.query.address;
    const emailInDatabase =  await newsletter_email.findOne({email:email});
    if(emailInDatabase){
      res.status(400).send('You\'ve already signed up!')
    }else{

      // get email address from query string
      let emailAddInstance = new newsletter_email({email: req.query.address})
      
      // insert to database
      emailAddInstance.save();

      res.status(200).send('Thanks For Signing Up!');
    }
  }catch(err){
    res.status(500).send('An error occurred while saving the email');
  }

  // return string notifiying successful result
  res.send();

});

const blendSchema = new mongoose.Schema({
  name: String,
  bitter: Number,
  vanillaLike: Number,
  fruity: Number,
  citrus: Number,
  mocha: Number,
  tangy: Number
});

const blend_schema_model = new mongoose.model('blend_schema_model', blendSchema);

app.get('/tasteQuiz', (req, res) => {

  function run(){

    // select the collection
    const collection = client.db('tino').collection('blends');

    // first we grab all the blends
    let allBlends = collection.find({},{});
    let queryTopTwoRegex = '';

    let blendDiffs = {};
    let blendDiffsArray = [];

    // this is the callback function, it will run directly after the "forEach"
    async function promiseOneResolve(){

      // switch record differences variable format to array
      for( var diff in blendDiffs){
        blendDiffsArray.push([diff, blendDiffs[diff]]);
      }

      // sort the array by most to least similar
      blendDiffsArray.sort((a,b)=>{
        return a[1] - b[1];
      });

      // create a regex to match only the top two blends 
      queryTopTwoRegex = new RegExp(blendDiffsArray[0][0]+'|'+blendDiffsArray[1][0]);

      // find the top two blends in the database
      let topTwoBlends = await client.db('tino').collection('blends').find({name: {$regex: queryTopTwoRegex}},{}).toArray();
   
      // return the top two blends
      res.send(topTwoBlends);
    }

    allBlends.forEach((item)=>{

      // this object is meant to record the differences between the user select preferences, and a given blend
      let blendOb = {};

      // grab the absolute value to avoid negatives
      blendOb.bitter = Math.abs(item.bitter - req.query.bitter);
      blendOb.vanillaLike = Math.abs(item.vanillaLike - req.query.vanillaLike);
      blendOb.fruity = Math.abs(item.fruity - req.query.fruity);
      blendOb.citrus = Math.abs(item.citrus - req.query.citrus);
      blendOb.mocha = Math.abs(item.mocha - req.query.mocha);
      blendOb.tangy = Math.abs(item.tangy - req.query.tangy);
      let blendName = item.name;

      // record the total difference between the user's preference and a given blend
      blendDiffs[blendName] = blendOb.bitter + blendOb.vanillaLike + blendOb.fruity + blendOb.citrus + blendOb.mocha + blendOb.tangy;
    }, promiseOneResolve);
  }
  run();
});

app.get('/getRelatedBlends', (req, res) => {

  function run(){

    // select the collection
    const collection = client.db('tino').collection('blends');

    // first we grab all the blends
    let allBlends = collection.find({},{});
    let queryTopTwoRegex = '';

    let blendDiffs = {};
    let blendDiffsArray = [];

    // this is the callback function, it will run directly after the "forEach"
    async function promiseOneResolve(){

      // switch record differences variable format to array
      for( var diff in blendDiffs){
        blendDiffsArray.push([diff, blendDiffs[diff]]);
      }

      // sort the array by most to least similar
      blendDiffsArray.sort((a,b)=>{
        return a[1] - b[1];
      });

      // create a regex to match only the top two blends 
      queryTopTwoRegex = new RegExp(blendDiffsArray[0][0]+'|'+blendDiffsArray[1][0]);

      // find the top two blends in the database
      let returnBlends = await client.db('tino').collection('blends').find({name: {$regex: queryTopTwoRegex}},{}).toArray();
   
      // return the top two blends
      res.send(returnBlends);
    }

    allBlends.forEach((item)=>{

      // be sure not to grab the blend itself
      if(item.slug != req.query.slug){

        // this object is meant to record the differences between the user select preferences, and a given blend
        let blendOb = {};

        // grab the absolute value to avoid negatives
        blendOb.bitter = Math.abs(item.bitter - req.query.bitter);
        blendOb.vanillaLike = Math.abs(item.vanillaLike - req.query.vanillaLike);
        blendOb.fruity = Math.abs(item.fruity - req.query.fruity);
        blendOb.citrus = Math.abs(item.citrus - req.query.citrus);
        blendOb.mocha = Math.abs(item.mocha - req.query.mocha);
        blendOb.tangy = Math.abs(item.tangy - req.query.tangy);
        let blendName = item.name;

        // record the total difference between the user's preference and a given blend
        blendDiffs[blendName] = blendOb.bitter + blendOb.vanillaLike + blendOb.fruity + blendOb.citrus + blendOb.mocha + blendOb.tangy;
      }
    }, promiseOneResolve);
  }
  run();
});

app.get('/', (req, res) => {
  newsletter_email.find({}, function (err, docs) {
    if (err){
      console.log(err);
    }
    else{
      res.send(docs);
    }
  });
});

app.get('/navItems', (req, res) => {
  res.send('{"link_names":"[Nicaraguan, Visit, Blends, Order, About]"}');
});

app.get('/getTeam', (req,res) => {
  async function run(){
    
    // select the collection
    const collection = client.db('tino').collection('employees');

    // get all employees as objects in an array
    let team = await collection.find({},{}).toArray();

    // return the employees
    res.send(team);
  }
  run();
});

app.get('/getBlends', (req,res) => {
  async function run(){
    
    // select the collection
    const collection = client.db('tino').collection('blends');

    // get all employees as objects in an array
    let blends = await collection.find({},{}).toArray();

    // return the employees
    res.send(blends);
  }
  run();
});

app.get('/getBlend', (req, res) => {

  async function run(blendSlug){

    // select the collection
    const collection = client.db('tino').collection('blends');

    // get the blend data as an array
    let blend = await collection.findOne({ slug: blendSlug });

    // return the blend data
    res.send(blend);
  }

  // function is defined then called afterwards to allow async functions
  run(req.query.blend);
});


app.get('/test', (req, res) => {
  res.send('test');
});

// app.listen(3003, () => {
//   console.log('running @3003');
// });

// Start the HTTPS server
https.createServer(options, app).listen(PORT, () => {
  console.log(`backend server is running on https://tinocaffeine.com:3003`);
});
















