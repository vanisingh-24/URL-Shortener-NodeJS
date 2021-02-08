const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');

const app = express();

mongoose.connect('mongodb://localhost/urlShortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//const connectDB = require('./config/db');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));

app.get('/', async (req,res) => {
   const shortUrls = await ShortUrl.find();
   res.render('index', {shortUrls: shortUrls});
});

app.post('/shortUrls', async (req,res) => {
   await ShortUrl.create({full: req.body.fullUrl});
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

   shortUrl.clicks++;
   shortUrl.save();

   res.redirect(shortUrl.full);
});

app.listen(process.env.PORT || 5000);
