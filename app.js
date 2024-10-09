const express = require("express");
const app = express();
const porta = 3000;
const bodyParser = require("body-parser");

//configurar arquivos EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Configurar os arquivos da pasta public
app.use(express.static('public'));

// Configurar bodyParser para prodessar os dados do forms
app.use(bodyParser.urlencoded({ extends: true }));

//dados para teste
const posts = [
    {
        id: 1,
        titulo: 'Primeira postagem',
        conteudo: 'Este é o conteudo da primeira postagem.'
    },

    {
        id: 2,
        titulo: 'Segunda postagem',
        conteudo: 'Este é o conteudo da segunda postagem.'
    }
];

//rota principal
app.get('/', (req, res) => {
    res.render('index', { posts });
});

//Rota para exibir um post individual
app.get('/post/:id', (req, res) => {
    const id = req.params.id;
    const post = posts.find(post => post.id === parseInt(id));
    res.render('post', { post });
});

//Rota para mostrar o formulario de adição
app.get('/add', (req, res) => {
    res.render('add');
});

//Rota para processar os dados do formulario de adição.
app.post('/add', (req, res) => {
    const { titulo, conteudo } = req.body;
    const id = posts.length + 1;
    posts.push({ id, titulo, conteudo });
    res.redirect('/');
});

//subir servidor
app.listen(porta, () => {
    console.log(`servidor rodando em http://localhost:${porta}`)
})