const config = require('./config')
const express = require('express');
const app = express();
const port = config.PORT;
const cookieParser = require('cookie-parser');

app.use(express.json());

app.use(cookieParser());

// Login Page
const loginPage = require('./pages/login')
app.get('/', loginPage)

// App Page
const appPage = require('./pages/app')
app.get('/app', appPage)

// Rotas api
const routes = require('./routes');
app.use('/api', routes)

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
