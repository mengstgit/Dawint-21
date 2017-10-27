const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bodyParser = require('body-parser');
const mongo = require('mongo');
const mongoose = require('mongoose');
const assert = require('assert');
const expressValidator = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const secret = require('../config/secret');


const metaTags = {
	    title : 'Contact Page',
		metaTagsUrl: 'localhost:/3000/contact',
		metaTagsSite: '@ coffee',
		metaTagsImg: 'localhost:3000//url/img.png',
		metaTagsTitle: 'Know About Coffe',
		metaTagsName: 'Test',
		metaTagsType: 'https://www. coffee.com/contact',
		metaTagsDescription: "This is About Coffe",
		metaTagsRobots: 'index,follow',
		metaTagsKeyWords: 'About Coffe, About the company Coffe, About who coffe is',
		errors : [],
		success_msg: []
};

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
    secret: secret.secretKey
}));

router.use(flash());
router.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});


router.get('/contact', (req, res) => {
   res.render('../views/main/contact', metaTags);
});

/* Process Form Data */
router.post('/Process_form', (req, res) => {
      req.checkBody('name', 'Name is required').notEmpty();
      req.checkBody('email', 'Email is required').notEmpty();
      req.checkBody('email', 'Email is not valid').isEmail();;
      req.checkBody('subject', 'Subject is required').notEmpty();
      req.checkBody('message', 'Message is required').notEmpty();

      const errors = req.validationErrors();

      if(errors) {
         req.flash('errors', 'please check the form details');
      	 metaTags.errors = errors;
      	 res.render('../views/main/contact', metaTags);

      } else {
      	 const formData = new User({
      	 	name : req.body.name,
      	 	email : req.body.email,
      	 	subject : req.body.subject,
      	 	message : req.body.message
      	 });
        console.log(formData);
       
      	 mongoose.connect(secret.database);
      	 const db = mongoose.connection;

      	 db.on('error', (err) => {
      	 	assert.equal(null, err);
      	 });
         db.open();
      	 db.once('open', () => {
      	 	db.collection(' coffee_data').save(formData, (err) => {
                  assert.equal(null, err);
                  console.log('data is inserted');
                  db.close();
                  req.flash('success_msg', 'Thanks for dropping us a message');
                  res.render('../views/main/contact', metaTags);
             
      	   });
      	 });

      }
});

module.exports = router;