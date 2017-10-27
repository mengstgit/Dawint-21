const express = require('express');
const router = express.Router();


router.get('/archive', (req, res) => {
	const metaTags = {
		    title: 'archive Page',
			metaTagsUrl: 'localhost:/3000/archive',
			metaTagsSite: '@grill',
			metaTagsImg: 'localhost:/3000/img.png',
			metaTagsTitle: 'Know About Coffee',
			metaTagsName: 'Test',
			metaTagsType: 'localhost:/3000/about',
			metaTagsDescription: "This is About Grill",
			metaTagsRobots: 'index,follow',
			metaTagsKeyWords: 'About Coffee, About the company Grill, About who grill is'
	};
	res.render('../views/main/archive', metaTags);

});

module.exports = router;