import express from 'express';
import path from 'path';
import nunjucks from 'nunjucks';
import fs from 'fs';

const __dirname = path.resolve();

const app = express();

// file path
// my_app/data/writing.json
const filePath = path.join(__dirname, 'data', 'writing.json');

// // body parser set
// app.use(bodyParser.urlencoded({ extended: false})); // express 기본 모듈 사용
// app.use(bodyParser.json());

// view engine set
app.set('view engine', 'html'); // main.html -> main(.html)

// nunjucks
nunjucks.configure('views', {
    autoescape: true,
    watch: true, // html 파일이 수정될 경우, 다시 반영 후 렌더링
    express: app
})

// middleware
// main page GET
app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/public/main.html');
    res.render('main');
});

app.get('/write', (req, res) => {
    res.render('write');
});

app.post('/write', (req, res) => {
    // request 안에 있는 내용을 처리
    // request.body
    const title = req.body.title;
    const contents = req.body.contents;
    const date = req.body.date;

    // 데이터 저장
    // data/writing.json 안에 글 내용이 저장
    const fileData = fs.readFileSync(filePath);
    console.log(fileData);

    res.render('detail', {title: title, contents: contents, date:date });
});

app.get('/detail', (req, res) => {
    res.render('detail');
})

app.get('/edit', (req, res) => {
    res.render('detail');
})

app.listen(3000, () => {
    console.log('Server is running');
});