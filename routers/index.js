const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
	const metaTags = {
		    title: 'Home Page',
			metaTagsUrl: 'localhost:/3000/',
			metaTagsSite: '@coffee',
			metaTagsImg: 'localhost:/3000/img.png',
			metaTagsTitle: 'Know About Coffee',
			metaTagsName: 'Test',
			metaTagsType: 'https://www.coffee.com/about',
			metaTagsDescription: "This is About Coffee",
			metaTagsRobots: 'index,follow',
			metaTagsKeyWords: 'About Coffee, About the company Coffee, About who coffee is'
	};
	res.render('../views/main/index', metaTags);

});

module.exports = router;

