let products = [
        { id: 1, name: 'iPhone 13', value: "3599.99"},
        { id: 2, name: 'Samsung S20', value: "2699.99"},
        { id: 3, name: 'Mouse', value: "129.99"},
        { id: 4, name: 'Teclado', value: "229.99"}
]

let nextProductId = products.length + 1;


const getAllProducts = (req, res) => {
    res.status(201).json(products);
}

const getProductId = (req, res) => {
    const id = Number(req.params.id);

    // Validação: id é um número inteiro:
    if (!Number.isInteger(id)) {
        return res.status(400).json({ message: 'O id fornecido precisa ser um número inteiro!' });
    }

    res.json(products[id]);
}

const addProduct = (req, res) => {
    let { name, value } = req.body;

    // validação se name e value foram passados
    if (!name || !value) {
        return res.status(400).json({ error: 'O nome e o valor são obrigatórios' });
    }

    // Validação: ‘value’ deve ser numérico com duas casas de precisão:
    const valueFloat = parseFloat(value).toFixed(2);
    if (value.length !== valueFloat.length) {
        return res.status(400).json({ error: 'O value deve ser numérico e com duas casas de decimais' });
    }

    const newProduct = { id: nextProductId++, name, value };
    products.push(newProduct);
    res.status(201).json(newProduct);
}

const updateProduct = (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, value } = req.body;

    // Validação: id é um número inteiro:
    if (!Number.isInteger(productId)) {
        return res.status(400).json({ message: 'O id fornecido precisa ser um número inteiro!' });
    }

    // validação de name do tipo string e não nulo
    if (typeof name !== 'string' || name === ''){
        return res.status(400).json( {message: 'Verifique se name é do tipo String e se não é nulo!'} );
    }

    // Validação: ‘value’ deve ser numérico com duas casas de precisão:
    const valueFloat = parseFloat(value).toFixed(2);
    if (value.length !== valueFloat.length) {
        return res.status(400).json({ error: 'O value deve ser numérico e com duas casas de decimais' });
    }

    const productIndex = products.findIndex((product) => product.id === productId);

    // verificar se o usuário existe
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // Atualiza os dados do usuário
    products[productIndex] = { ...products[productIndex], name, value };
    res.json({ message: `Produto com ID ${productId} atualizado` });
};

const deleteProduct = (req, res) => {
    const productId = parseInt(req.params.id);

    // Validação: id é um número inteiro:
    if (!Number.isInteger(productId)) {
        return res.status(400).json({ message: 'O id fornecido precisa ser um número inteiro!' });
    }

    products = products.filter((product) => product.id !== productId);

    res.json({ message: `Produto com ID ${productId} excluído` })
}

module.exports = {
    getAllProducts,
    getProductId,
    addProduct,
    updateProduct,
    deleteProduct,
}