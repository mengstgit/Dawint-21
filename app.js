/* dependencies */
const express = require('express');
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8080;
const User = require('./models/user'); 

/*express */
const app = express();

const homeRoute = require('./routers/index');
const aboutRoute = require('./routers/about');
const productsRoute = require('./routers/products');
const contactRoute = require('./routers/contact');
const singlePostRoute = require('./routers/single_post');

/* view engine */
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

app.use(express.static('public'));
/* middleware */
app.use(homeRoute);
app.use(aboutRoute);
app.use(productsRoute);
app.use(contactRoute);
app.use(singlePostRoute);
/* server */
app.listen(port, () => {
	 console.log(`app is listening on port ${port}`);
});