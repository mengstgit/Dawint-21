const express = require('express');
const router = express.Router();
const mongo = require('mongo');
const mongoose = require('mongoose');


const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const flash = require('express-flash');
const assert = require('assert');

const User = require('../models/user');

const url = 'mongodb://admin:admin@ds113795.mlab.com:13795/grill';


router.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.use(cookieParser());
router.use(session({
    resave : true,
    saveUninitialized: true,
    secret: 'rq23effq4'
}));

router.use(flash());
router.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

const metaTags = {
	    title : 'Contact Page',
		metaTagsUrl: 'localhost:/3000/contact',
		metaTagsSite: '@grill',
		metaTagsImg: 'localhost:3000//url/img.png',
		metaTagsTitle: 'Know About Grill',
		metaTagsName: 'Test',
		metaTagsType: 'https://www.grill.com/about',
		metaTagsDescription: "This is About Grill",
		metaTagsRobots: 'index,follow',
		metaTagsKeyWords: 'About Grill, About the company Grill, About who grill is',
		errors : [],
		success_msg: []
};
router.get('/contact', (req, res) => {
   res.render('../views/main/contact', metaTags);
});

/* Process Form Data */
router.post('/send_message', (req, res) => {
      req.checkBody('name', 'Name is required').notEmpty();
      req.checkBody('email', 'Email is required').notEmpty();
      req.checkBody('email', 'Email is not valid').isEmail();;
      req.checkBody('subject', 'Subject is required').notEmpty();
      req.checkBody('message', 'Message is required').notEmpty();

      const errors = req.validationErrors();

      if(errors) {
      	 metaTags.errors = errors;
      	 req.flash('errors', 'Please enter form Details');
      	 res.render('../views/main/contact', metaTags);

      } else {
      	 const formData = new User({
      	 	name : req.body.name,
      	 	email : req.body.email,
      	 	subject : req.body.subject,
      	 	message : req.body.message
      	 });
        console.log(formData);
       
      	 mongoose.connect(url);
      	 const db = mongoose.connection;

      	 db.on('error', (err) => {
      	 	assert.equal(null, err);
      	 });
         db.open();
      	 db.once('open', () => {
      	 	console.log('data is inserted');
      	 	//assert.equal(null, err);
      	 	db.collection('grill_data').save(formData, (err) => {
                  assert.equal(null, err);
                  console.log('data is inserted');
                  req.flash('success_msg', 'Thanks for dropping by');
                res.render('../views/main/contact', metaTags);
             
      	   });
      	 });
      	 db.close();
      }

      

})

module.exports = router;