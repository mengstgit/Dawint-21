const express = require('express');
const router = express.Router();


router.get('/about', (req, res) => {
	const metaTags = {
		title: 'About Page',
		metaTagsUrl: 'localhost:/3000/about',
		metaTagsSite: '@cofee',
		metaTagsImg: 'localhost:/3000/img.png',
		metaTagsTitle: 'Test',
		metaTagsName: 'coffee',
		metaTagsType: 'website',
		metaTagsDescription: "This is a contact page",
		metaTagsRobots: 'index,follow',
		metaTagsKeyWords: 'Food, Fun, coffee, Ecommerce'
	};
		
	res.render('../views/main/about', metaTags);
});

module.exports = router;