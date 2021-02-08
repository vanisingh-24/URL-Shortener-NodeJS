const express = require('express');
const mongoose = require('mongoose');
const Url = require('./models/Url');

mongoose.connect('mongodb://localhost/urlShortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//const connectDB = require('./config/db');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));

app.get('/', async (req,res) => {
   const shortUrl = await ShortUrl.find();
   res.render('index', {shortUrl: shortUrl});
});

app.post('/Url', async (req,res) => {
   await Url.create({full: req.body.fullUrl});
   res.redirect('/');
});

//Connect to databse
//connectDB();

//Define routes
//app.use('/', require('./routes/index'));
//app.use('/api/url', require('./routes/url'));

// const PORT = 5000;
app.get('/:shortUrl',async (req,res) => {
   const shortUrl = await ShortUrl.findOne({short: req.param.shortUrl });
   if(shortUrl == null) return res.sendStatus(404);
});

app.listen(process.env.PORT || 5000);
