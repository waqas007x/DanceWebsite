const express= require('express');
const path =require("path");
const app= express();
const bodyparser=require('body-parser');
var mongoose=require('mongoose'); 
const port = 8000;

mongoose.connect("mongodb://localhost/contactDance",{useNewUrlParser:true, useUnifiedTopology: true});
/* schema */
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    desc: String
  })
  const contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) 

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    var mydata=new  contact(req.body);
    mydata.save().then(()=>{
        res.send('this is item has been  saved to database!')
    }).catch(()=>{
        res.status(400).send('item was not saved');
    });
});
     /* /* res.status(200).render('contact.pug', params);}) */  

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});