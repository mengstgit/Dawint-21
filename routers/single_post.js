const express = require('express');
const router = express.Router();

router.get('/single_post', (req, res) => {
	const metaTags = {
		    title: 'single_post',
			metaTagsUrl: 'localhost:/3000/single_post',
			metaTagsSite: '@grill',
			metaTagsImg: 'localhost:/3000/img.png',
			metaTagsTitle: 'Know About Grill',
			metaTagsName: 'Test',
			metaTagsType: 'https://www.grill.com/about',
			metaTagsDescription: "This is About Grill",
			metaTagsRobots: 'index,follow',
			metaTagsKeyWords: 'About Grill, About the company Grill, About who grill is'
	};
	res.render('../views/main/single_post', metaTags);

});

module.exports = router;