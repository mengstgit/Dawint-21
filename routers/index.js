const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
	const metaTags = {
		    title: 'Home Page',
			metaTagsUrl: 'localhost:/3000',
			metaTagsSite: '@grill',
			metaTagsImg: 'localhost:/3000/img.png',
			metaTagsTitle: 'Know About Grill',
			metaTagsName: 'Test',
			metaTagsType: 'https://www.grill.com/about',
			metaTagsDescription: "This is About Grill",
			metaTagsRobots: 'index,follow',
			metaTagsKeyWords: 'About Grill, About the company Grill, About who grill is'
	};
	res.render('../views/main/index', metaTags);

});

module.exports = router;

