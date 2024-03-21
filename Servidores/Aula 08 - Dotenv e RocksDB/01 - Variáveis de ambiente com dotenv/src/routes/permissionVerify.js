const { SECRET_KEY } = require('../config');
const jwt = require('jsonwebtoken');

function permissionVerify(req, res, next) {
    // Verifica se o cookie de session_id está presente na requisição
    const sessionToken = req.cookies.session_id;

    if (!sessionToken) {
        return res.status(401).json({ error: 'Token JWT ausente' });
    }

    // Verifica e decodifica o token JWT
    jwt.verify(sessionToken, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token JWT inválido' })
        } else {
            // Token válido
            req.user = decoded.user // Armazena as informações do usuário decodificados no objeto req
            next() // Passa a requisição para o próximo middleware ou rota
        }
    });
}

module.exports = permissionVerify;