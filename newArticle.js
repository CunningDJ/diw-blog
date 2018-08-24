'use strict';

/*
Use this to create a new article from template in the p/ folder.  Give the ID string as the argument
Usage: node new_article.js [article id string]
*/

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname);
const DATA_DIR = path.join(ROOT_DIR, 'd/');
const TEMPLATES_DIR = path.join(ROOT_DIR, 'templates/');
const POSTS_DIR = path.join(ROOT_DIR, 'p/');

const POSTS_JSON_FP = path.join(DATA_DIR, 'posts.json');
const AUTHORS_JSON_FP = path.join(DATA_DIR, 'authors.json');

const PAGE_FRAME_TEMPL_FP = path.join(TEMPLATES_DIR, 'page-frame.html');
const ARTICLE_TEMPL_FP = path.join(TEMPLATES_DIR, 'article.html');

const CONTENT_TAG = '{{content}}';
const TITLE_TAG = '{{title}}';
const DESCRIPTION_TAG = '{{description}}';
const AUTHOR_NAME_TAG = '{{authorName}}';
const AUTHOR_URL_TAG = '{{authorUrl}}';
const DATE_TAG = '{{date}}';



function main() {
    if (process.argv.length != 5) {
        return console.error('Usage: node new_article.js [new article id string] [author id] [title]');
    }

    let articleId = process.argv[2];
    let authorId = process.argv[3];
    let articleTitle = process.argv[4];

    console.log('[articleId:]', articleId, '[authorId:]', authorId, '[title:]', articleTitle);

    let posts = getPostsJson();
    
    // post (article ID) already exists check
    /*if (posts[articleId] !== undefined) {
        return console.error('ERR: Article with ID', articleId, 'already exists.');
    }*/

    // Processing author input
    let authors = getAuthorsJson();
    let authorName = null;
    let authorUrl = null;
    if (authors[authorId] === undefined) {
        console.log('NEW AUTHOR ID:', authorId);
        console.log('Adding authorId to', AUTHORS_JSON_FP);
        console.log('Please fill in name and url for new author.');

        // Adding new author
        authors[authorId] = {
            "name": "",
            "refLink": ""
        };

        writeAuthorsJson(authors);
    } else {
        authorName = authors[authorId].name;
        authorUrl = authors[authorId].refLink;
    }

    // Creating article boilerplate
    let templateMap = {};
    templateMap[TITLE_TAG] = articleTitle;
    if (authorName !== null) {
        templateMap[AUTHOR_NAME_TAG] = authorName;
    }

    if (authorUrl !== null) {
        templateMap[AUTHOR_URL_TAG] = authorUrl;
    }

    // creating datetime string for article
    let dateString = newDateTimeString();
    templateMap[DATE_TAG] = dateString;

    // creating html file with populated template
    createArticle(articleId, templateMap);
    //console.log(populateArticleTemplate(templateMap));

    // adding JSON entry to d/authors.json
    let newPost = {
        title: articleTitle,
        date: dateString,
        authorId: authorId,
        description: null       // TODO: Add description
    };

    posts[articleId] = newPost;
    writePostsJson(posts);
}

// string utils
function newDateTimeString() {
    let d = new Date();
    return d.toDateString() + ' ' + d.toTimeString();
}

// file utils
function getFileText(filepath) {
    return fs.readFileSync(filepath, { encoding: 'utf8' });
}

function getFileJson(filepath) {
    return JSON.parse(getFileText(filepath));
}

function writeJsonFile(filepath, json_obj) {
    fs.writeFileSync(filepath, JSON.stringify(json_obj, null, 2));
}


// html templates
function articleFP(articleId) {
    return path.join(POSTS_DIR) + articleId + '.html';
}

function createArticle(articleId, replaceMap) {
    /*
        {{title}}
        {{authorName}}
        {{authorId}}
        {{authorUrl}}
        {{description}}
    */

    let outFilepath = articleFP(articleId);
    console.log('New article made in:', outFilepath);

    let page = populateArticleTemplate(replaceMap);
    fs.writeFileSync(outFilepath, page);
}

function populateArticleTemplate(replaceMap) {
    var page = getArticleTemplate();

    Object.entries(replaceMap).forEach(([tag, str]) => {
        // console.log('tag:', tag, 'str:', str);
        page = page.replace(new RegExp(tag, 'g'), str);
    });

    return page;
}


function getArticleTemplate() {
    let page = getFileText(PAGE_FRAME_TEMPL_FP);
    let aT = getFileText(ARTICLE_TEMPL_FP);

    page = page.replace(CONTENT_TAG, aT);

    return page;
}

// AUTHORS json
function getAuthorsJson() {
    return getFileJson(AUTHORS_JSON_FP);
}

function writeAuthorsJson(json_obj) {
    writeJsonFile(AUTHORS_JSON_FP, json_obj);
}


// POSTS json
function getPostsJson() {
    return getFileJson(POSTS_JSON_FP);
}

function writePostsJson(json_obj) {
    writeJsonFile(POSTS_JSON_FP, json_obj);
}


// main method
if (require.main === module) {
    main();
}