const express = require('express');
const connectDB = require('./config/db');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req,res) => {
   res.render('index')
});

//Connect to databse
connectDB();

app.use(express.json({extended: false}));

//Define routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

// const PORT = 5000;

app.listen(process.env.PORT || 5000);
