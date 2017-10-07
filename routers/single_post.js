const express = require('express');
const router = express.Router();

router.get('/single_post', (req, res) => {
	const metaTags = {
		    title: 'single_post',
			metaTagsUrl: 'https://Test.com/',
			metaTagsSite: '@grill',
			metaTagsImg: 'https://url/img.png',
			metaTagsTitle: 'Know About Grill',
			metaTagsName: 'Test',
			metaTagsType: 'https://www.grill.com/about',
			metaTagsDescription: "This is About Grill",
			metaTagsRobots: 'index,follow',
			metaTagsKeyWords: 'About Grill, About the company Grill, About who grill is'
	};
	res.render('../views/main/about', metaTags);

});

module.exports = router;