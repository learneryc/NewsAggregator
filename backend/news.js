var express = require('express')
var router = express.Router()
var axios = require('axios');

const gdAPIKey = '9fb70b24-8346-4f75-a327-5d3f2e1ff14a';
const nyAPIKey = 'ebtJsSCcE8BGGMWsL7R1lnAAXpBDUpgH';
const gdUrl = 'https://content.guardianapis.com/';
const nyUrl = 'https://api.nytimes.com/svc/';
const nyImgUrl = 'https://www.nytimes.com/';

//get guardian news sections
/*** /news/guardian?section=home | world | sport | business | technology | politics ***/
router.get('/guardian', function(req, res) {
	let section = req.query.section;
	let params = {
        'api-key': gdAPIKey,
        'show-blocks': 'all'
    };
	if (section == 'home') {
		section = 'search';
		params['section'] = '(sport|business|technology|politics)';
	}
	let url = gdUrl + section;
	axios.get(url, {params: params}).then(response => {
		let results = response.data.response.results;
		results = extractGuardianSections(results);
		res.json({'results': results});
	});
});

//get a certain article from guardian news
/*** /news/guardian/article?id=`articleId` ***/
router.get('/guardian/article', function(req, res){
	let id = req.query.id;
	let params = {
		'api-key': gdAPIKey,
        'show-blocks': 'all'
	};
	let url = gdUrl+id;
	axios.get(url, {params: params}).then(response => {
		let results = response.data.response.content;
		results = extractGuardianArticles(results);
		res.json({'results': results});
	});
});

//get search results from guardian news and new york times news
/*** /news/search?q=`query` ***/
router.get('/search', function(req, res){
	let query = req.query.q;
	Promise.all([getGuardianSearchResults(query), getNewYorkTimesSearchResults(query)]).then((results) => {
        res.json({'results': results[0].concat(results[1])});
    }).catch((error) => {
        res.send(error);
    })
});

//get new york times news sections
/*** /news/nytimes?section=home | world | sports | business | technology | politics ***/
router.get('/nytimes', function(req, res){
	let section = req.query.section;
	let params = {
        'api-key': nyAPIKey
    };
    if (section==='sport') section = 'sports';
	let url = `${nyUrl}topstories/v2/${section}.json`;

	axios.get(url, {params: params}).then(response => {
		let results = response.data.results;
		results = extractNewYorkTimesSections(results);
		res.json({'results': results});
	});
});

//get a certain article from new york times news
/*** /news/nytimes/article?id=`articleId` ***/
router.get('/nytimes/article', function(req, res){
	let id = req.query.id;
	let params = {
		'api-key': nyAPIKey,
		'fq': `web_url:("${id}")`
	};
	let url = nyUrl+'search/v2/articlesearch.json';
	axios.get(url, {params: params}).then(response => {
		let results = response.data.response.docs[0];
		results = extractNewYorkTimesArticles(results);
		res.json({'results': results});
	});
});

function isComplete(obj) {
	for (let key in obj) {
		if (!obj[key]) return false;
	}
	return true;
}

function extractGuardianSections(res) {
	let results = [];
	res.forEach((r)=> {
		let images = r.blocks.main.elements[0].assets;
		let image = images.length? images.slice(-1)[0].file: null;
		let result = {
			'id': r.id,
			'url': r.webUrl,
			'title': r.webTitle,
			'image': image,
			'section': r.sectionId.toUpperCase(),
			'date': r.webPublicationDate.slice(0, 10),
			'description': r.blocks.body[0].bodyTextSummary
		};
		if (isComplete(result)) results.push(result);
	});
	return results;
}

function extractGuardianArticles(res) {
	let results = {
		'id': res.id,
		'url': res.webUrl,
		'title': res.webTitle,
		'image': res.blocks.main.elements[0].assets.slice(-1)[0].file,
		'section': res.sectionId.toUpperCase(),
		'date': res.webPublicationDate.slice(0, 10),
		'description': res.blocks.body[0].bodyTextSummary
	}
	return results;
}

function extractGuardianSearchResults(res) {
	let results = [];

	res.forEach((r)=> {
		let main = r.blocks.main? r.blocks.main: {};
		let images = main.elements? main.elements[0].assets: [];
		let image = images.length? images.slice(-1)[0].file: null;
		let result = {
			'id': r.id,
			'url': r.webUrl,
			'title': r.webTitle,
			'image': image,
			'section': r.sectionId.toUpperCase(),
			'date': r.webPublicationDate.slice(0, 10),
			'source': 'guardian'
		};
		if (isComplete(result)) results.push(result);
	});
	return results;
}

function getGuardianSearchResults(query) {
	let params = {
		'api-key': gdAPIKey,
        'show-blocks': 'all',
        'q': query
	};
	let url = gdUrl + 'search';

	return new Promise((resolve) => {
		axios.get(url, {params: params}).then(response => {
			let results = response.data.response.results;
			results = extractGuardianSearchResults(results);
			resolve(results);
		});
	});
}

function getNewYorkTimesSearchResults(query) {
	let params = {
		'q': query,
		'api-key': nyAPIKey
	}
	let url = nyUrl + 'search/v2/articlesearch.json';

	return new Promise((resolve) => {
		axios.get(url, {params: params}).then(response => {
			let results = response.data.response.docs;
			results = extractNewYorkTimesSearchResults(results);
			resolve(results);
		});
	});
}

function extractNewYorkTimesSearchResults(res) {
	let results = [];
	res.forEach((r)=> {
		let imgUrl = '';
		for (img of r.multimedia) {
			if (img.width >= 1000) {
				imgUrl = nyImgUrl + img.url;
				break;
			}
		}
		let result = {
			'id': r.web_url,
			'url': r.web_url,
			'title': r.headline.main,
			'image': imgUrl,
			'section': r.news_desk.toUpperCase(),
			'date': r.pub_date.slice(0, 10),
			'source': 'nytimes'
		};
		if (isComplete(result)) results.push(result);
	});
	return results;
}

function extractNewYorkTimesSections(res) {
	let results = [];
	for (r of res) {
		let imgUrl = '';
		for (img of r.multimedia) {
			if (img.width >= 1000) {
				imgUrl = img.url;
				break;
			}
		}
		let result = {
			'id': r.url,
			'url': r.url,
			'title': r.title,
			'image': imgUrl,
			'section': r.section.toUpperCase(),
			'date': r.published_date.slice(0, 10),
			'description': r.abstract
		};
		if (isComplete(result)) results.push(result);
		if (results.length == 10) break;
	}
	return results;
}

function extractNewYorkTimesArticles(res) {
	let imgUrl = res.multimedia[0].url;
	for (img of res.multimedia) {
		if (img.width >= 1000) {
			imgUrl = nyImgUrl + img.url;
			break;
		}
	}
	let results = {
		'id': res.web_url,
		'url': res.web_url,
		'title': res.headline.main,
		'image': imgUrl,
		'section': res.news_desk.toUpperCase(),
		'date': res.pub_date.slice(0, 10),
		'description': `${res.abstract} ${res.lead_paragraph}`
	};
	return results;
}

module.exports = router