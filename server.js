
const express = require('express') //import express library to this express 
const morgan = require('morgan') //third party middleware function যেটি console এ কি request পাঠানো হয়েছে তার বিস্তারিত দেখাবে 
const bodyParser = require('body-parser') //যে request গুলোর(put, put) সাথে user কোন data পাঠায় সেই data গুলো extract করে 
const cors = require('cors')  //package for providing a Connect/Express middleware that can be used to enable CORS with various options.



// getting-started.js(database create and connect)
const mongoose = require('mongoose');  //.js mongoose এর সাথে deal করবে আর mongoose database এর সাথে deal করবে 
mongoose.connect('mongodb://localhost/contacts-db', {useNewUrlParser: true}); // এখানে 'contacts-db' নামের doccument(database) তৈরি হবে 



//get notified if we connect successfully or if a connection error occurs:
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connection Establisheed')
});



// router টাকে import করা হলো যেটা contact.js থেকে export করা হয়েছিলো
const contactRouter = require('./api/routes/contact')



//create express application 
const app = express()
app.use(morgan('dev'))  //'dev'মানে হলো console এর output টি আমরা development mode এ দেখতে চাই
app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())



app.use('/api/contacts', contactRouter)



// createing a port
// 'process.env.PORT' দেয়ার মানে হলো যদি আমরা এটা host করি তখন এটী সেই port দেখাবে নয়তো port হিসেবে 4000 দেখাবে 
const PORT = process.env.PORT || 4000



// Create route
// client কি request পাঠিয়েছে তা 'request' parameter এর মাধ্যমে জানতে পারবো
// কি response পাঠাতে হবে তা 'response' parameter এর মাধ্যমে জানাতে পারবো
app.get('/', (request, response) => {
    response.send('Best of luck to me!')
})


// server running আছে কিনা সেটা console এ message আকারে দেখাবে
app.listen(PORT, () => {
    console.log(`Server is Running on PORT ${PORT}`)
})
