const { SECRET_KEY } = require('../config');
const jwt = require('jsonwebtoken');

let loginUsers = [
    {
        "username": "Pedro",
        "name": "Pedro Sávio",
        "password": "654321",
        "userType": [ "admin", "user" ],
    },
    {
        "username": "Larissa",
        "name": "Larissa Spinosa",
        "password": "123456",
        "userType": [ "user" ],
    }
]

const getLogin = async (req, res) => {
    const user = req.user;
    return res.json(user);
}

const autenticate = async (req, res, next) => {
    const { username, password } = req.body;

    const error = "Usuário e/ou senha inválidos!";
    if (!username || !password) {
        res.cookie('session_id', '', { expires: new Date(0) });
        return res.status(400).json({ error });
    }

    // Procura a existência de um usuário e senha em loginUsers
    const foundUser = loginUsers.filter(user => user.username === username && user.password === password);
    if (foundUser.length === 0) {
        res.cookie('session_id', '', { expires: new Date(0) });
        return res.status(400).json({ error });
    }

    // Usuário encontrado!
    const user = {
        username: foundUser[0].username,
        name: foundUser[0].name,
        user_type: foundUser[0].userType,
    }

    // Gerando token JWT com informações personaizadas e enviando como cookie session_id
    try {
        const sessionToken = await jwt.sign({ user }, SECRET_KEY);
        res.cookie('session_id', sessionToken, { maxAge: 900000, httpOnly: true });
        res.json({ token: sessionToken });
        return next();
    } catch (err) {
        res.status(500).json({ error: 'Erro ao gerar token JWT' })
    }
}

module.exports = {
    getLogin,
    autenticate,
}