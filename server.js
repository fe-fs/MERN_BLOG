//import dependencies
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

//using better method than this
//const cors = require('cors'); // //cors >> to let data be access from different origins (servers) || not ideal 
//better is to add a proxy inside the client package.json file

const path = require('path'); 


//inicialize express
const app = express();
//server port
const PORT = process.env.PORT || 8080; //has to be like that! >> important when deploy with heroku


//bring in (import) the routes to be used by the server
const routes = require('./routes/api');


//connect to mongoDB cluster or local and make it work with heroku (process.env.)
const MONGODB_URI = 'mongodb+srv://adminTEST:MerryXmas@mernblog.315eixt.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mern_blog'  , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4 // makes mongodb look for IPVA4 
});


// //connect to mongoDB cluster ** needs to be protected
// const MONGODB_URI = 'mongodb+srv://adminTEST:MerryXmas@mernblog.315eixt.mongodb.net/?retryWrites=true&w=majority';
// mongoose.connect(MONGODB_URI , {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     family: 4 // makes mongodb look for IPVA4 
// });


// //connect to mongoDB LOCAL (para juntar o local e o cluster ao msm tempo add MONGO_URI || localurl)
// mongoose.connect('mongodb://localhost:27017/mern_blog', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     family: 4 // makes mongodb look for IPVA4 
// });

//verify mongoDB connection
mongoose.connection.on('connected', () => {
    console.log('Mongo is connected!!!')
});

//Data Parsing
app.use(express.json()); //this makes the req.body (api.js) see all the content to show in the console
app.use(express.urlencoded({ extended: false}));//false is for simple objs

//create connection to heroku //needs to build client in cmd *when ready* and refer to it in server package.json
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}


// //Blog Schema >>SENT TO MODEL FOLDER
// const Schema = mongoose.Schema;
// const BlogPostSchema = new Schema ({
//     title: String,
//     body: String,
//     date: {
//         type: String,
//         default: Date.now()
//     }
// });

// //Model
// const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

// //THIS IS FOR TEST HERE IN SERVER.JS 
// //Creating data to the mongo database test
// const data = {
//     title: 'Welcome to my blog app',
//     body: 'Learning the full process of a MERN app creation'
// };

// // saving data with .save();
//     //create a new instance of the blogpost model and then pass the data we create (const data)
// const newBlogPost = new BlogPost(data);
// newBlogPost.save((error) => { 
// if(error){
//     console.log('not saved ERROR');
// }else{
//     console.log('data saved sucessfully!');
// }
// });


//allow to send data betweens different places USING ANOTHER METHOD
//app.use(cors());



//HTTP request logger 
app.use(morgan('tiny'));

//configure connection with route (routes/api.js)
app.use('/api', routes);

// //define routes inside server >> MOVE IT TO THE ROUTES FOLDER/APIS.JS (CHANTE APP TO ROUTER THERE)
// app.get('/api',(req, res) => {
//     //adding blogpost from mongo to this route localhost:8080/api
//     BlogPost.find({  })
//         .then((data) => {
//             console.log('Data: ', data);
//             res.json(data);
//         })
//         .catch((error) => {
//             console.log('error: ', daerrorta);
//         });

// });

// app.get('/api/name',(req, res) => {
//     const data = {
//         username: 'test2',
//         age: 5
//     };
//     res.json(data); //send data as json file
// });

//verify localserver connect 
app.listen(PORT, console.log(`Server is starting at ${PORT}`));