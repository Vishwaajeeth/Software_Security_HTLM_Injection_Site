const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const { JSDOM } = require('jsdom');
const sanitizeHtml = require('sanitize-html');
const window = new JSDOM('').window;
const app = express();
const port = 3000;


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

const upload = multer({ storage: storage });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'main_page.html'));
});



// Handle form submission for level 1
app.post('/level1/submit', upload.single('file'), (req, res) => {
  const { name, email, message } = req.body;
  const file = req.file;

  const submittedData = `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`;
  res.send(submittedData);
});



// Handle form submission for level 2
app.post('/level2/submit', upload.single('file'), (req, res) => {
    let { name, email, message } = req.body;

    name = sanitizeInput(name);
    email = sanitizeInput(email);
    message = sanitizeInput(message);

    const submittedData = `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`;
    res.send(submittedData);
});




// Handle form submission for level 3
app.post('/level3/submit', upload.single('file'), (req, res) => {
    let { name, email, message } = req.body;

    name = sanitizeInput2(name);
    email = sanitizeInput2(email);
    message = sanitizeInput2(message);

    const submittedData = `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`;
    res.send(submittedData);
});



// Handle form submission for level 4
app.post('/level4/submit', upload.none(), (req, res) => {
    let { name, email, message } = req.body;

    name = sanitizeHtml(name, {
        disallowedTagsMode: 'discard',
        allowedTags: [],
        allowedAttributes: {}
    });

    email = sanitizeHtml(email, {
        disallowedTagsMode: 'discard',
        allowedTags: [],
        allowedAttributes: {}
    });

    message = sanitizeHtml(message, {
        disallowedTagsMode: 'discard',
        allowedTags: [],
        allowedAttributes: {}
    });

    const submittedData = `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`;
        res.send(submittedData);
});



// Handle form submission for level 5
app.post('/level5/submit', upload.none(), (req, res) => {
    let { name, email, message } = req.body;

    name = sanitizeHtml(name, {
        disallowedTagsMode: 'discard',
        allowedTags: [],
        allowedAttributes: {}
    });

    email = sanitizeHtml(email, {
        disallowedTagsMode: 'discard',
        allowedTags: [],
        allowedAttributes: {}
    });

    message = sanitizeHtml(message, {
        disallowedTagsMode: 'discard',
        allowedTags: [],
        allowedAttributes: {}
    });

    const submittedData = `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`;
        res.send(submittedData);
});





function sanitizeInput(input) {
    const sanitizedInput = input.replace(/<(\/?)(h1|p|a|img|div|br|input|textarea|form|label|span|strong|ul|li|ol|table|tr|td|th)( [^>]*)?>/gi, '')
                                 .replace(/\bstyle\s*=\s*".*?"/gi, '') 
                                 .replace(/\bclass\s*=\s*".*?"/gi, '') 
                                 .replace(/\bid\s*=\s*".*?"/gi, '') 
                                 .replace(/\bsrc\s*=\s*".*?"/gi, ''); 
    return sanitizedInput;
}



function sanitizeInput2(input) {
    const escapedInput = input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
        .replace(/\//g, "&#x2F;")
        .replace(/[^\x20-\x7E]/g, ""); 

    const sanitizedInput = escapedInput.replace(/<(\/?)(script|style|object|embed|iframe|frame|frameset|meta|link|base|applet|object|video|audio|source|track|map|area|input|textarea|select|button|option|optgroup|fieldset|legend|datalist|keygen|output|details|summary|plaintext|param|acronym|basefont|big|blink|center|dir|font|frame|frameset|isindex|listing|marquee|multicol|nobr|noembed|noframes|plaintext|spacer|strike|tt|xmp|base|command|keygen|menu|rtc|source|form|html|head|body|title|header|footer|nav|aside|section|article|address|main|figure|figcaption|details|summary|dialog|template|slot|content|input|select|textarea|button|label|output|optgroup|option|fieldset|legend|datalist|keygen|progress|meter|details|summary|command|menu|menuitem|audio|video|track|picture|source|canvas|map|area|iframe|object|param|svg|math|table|caption|colgroup|col|tbody|thead|tfoot|tr|td|th|form|fieldset|legend|label|input|button|select|datalist|optgroup|option|textarea|keygen|output|progress|meter|details|summary|command|menu|video|audio|track|source|iframe|embed|object|param|picture|canvas|map|area|svg|math|applet|audio|base|basefont|big|blink|center|dir|font|frame|frameset|isindex|listing|marquee|multicol|nobr|noembed|noframes|plaintext|spacer|strike|tt|xmp|base|command|keygen|menu|rtc|source)( [^>]*)?>/gi, '');
    const sanitizedInputWithoutEvents = sanitizedInput.replace(/<([a-z][a-z0-9]*)(?:[^>]*(?:\bon[a-z]+)="[^"]*")?[^>]*>/gi, function(match, tag) {
        return '<' + tag;
    });

    const sanitizedInputWithoutComments = sanitizedInputWithoutEvents.replace(/<!--[\s\S]*?-->/g, '');
    const sanitizedInputWithoutAttributeValues = sanitizedInputWithoutComments.replace(/=[^\s'">]+/g, '');
    const sanitizedInputWithoutSelfClosingTags = sanitizedInputWithoutAttributeValues.replace(/<[^>]+\/>/g, '');
    const sanitizedInputWithoutURLs = sanitizedInputWithoutSelfClosingTags.replace(/\b(?:https?|ftp|file):\/\/[^\s<>'"]+/gi, '');
    return sanitizedInputWithoutURLs;
}


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
