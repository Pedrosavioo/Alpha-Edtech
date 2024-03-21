let customers = [
    { id: 1, name: "João", email: "joao@example.com" },
    { id: 2, name: "Maria", email: "maria@example.com" },
    { id: 3, name: "Pedro", email: "pedro@example.com" },
    { id: 4, name: "Ana", email: "ana@example.com" },
    { id: 5, name: "Carlos", email: "carlos@example.com" }
]

let customerID = customers.length + 1;

const getAllCustomers = (req, res) => {
    res.json(customers)
}

const getCustomer = (req, res) => {
    try {
        let id = parseInt(req.params.id);

        // Validação: id é um número inteiro:
        if (!Number.isInteger(id)) {
            throw res.status(400).json({ message: 'O id fornecido precisa ser um número inteiro!' });
        }

        id++
        res.json(customers[id]);
    } catch(err) {
        res.status(500).json({ error: 'Erro ao buscar cliente.' });
    }
}

const addCustomer = (req, res) => {
    const { name, email } = req.body;

    // Validação: Name e email não são nulos:
    if (!name || !email) {
        return res.status(400).json( {message: 'name e email são obrigatórios!'} );
    }

    // validação de name do tipo string
    if (typeof name !== 'string' || name === ''){
        return res.status(400).json( {message: 'Verifique se name é do tipo String e se não é nulo!'} );
    }

    // Validação email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        return res.status(400).json( {message: 'O email inserido não é válido'} )
    }

    const newCustomer = { id: customerID, name: name, email: email }
    customers.push(newCustomer);
    res.json({
        message: 'cliente adicionado com sucesso',
        addCustomer: newCustomer 
    })
}

const updateCustomer = (req, res) => {
    const id = parseInt(req.params.id) - 1;

    const { name, email } = req.body;

    // Validação: id é um número inteiro:
    if (!Number.isInteger(id)) {
        return res.status(400).json( {message: 'O id fornecido precisa ser do tipo inteiro!'} )
    }

    // Validação: Name e email passados:
    if (!name || !email) {
        return res.status(400).json( {message: 'name e email são obrigatórios!'} )
    }

    // validação de name do tipo string e não nulo
    if (typeof name !== 'string' || name === ''){
        return res.status(400).json( {message: 'Verifique se name é do tipo String e se não é nulo!'} );
    }

    // Validação email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        return res.status(400).json( {message: 'O email inserido não é válido'} )
    }

    if (!name || !email) {
        return res.status(201).json( {error: 'name e email são obrigatórios'} )
    }

    customers[id] = { id: id + 1, name: name, email: email }
    res.json({ message: `cliente com id ${id + 1} atualizado com sucesso` })
}

const deleteCustomer = (req, res) => {
    const id = parseInt(req.params.id);

    // Validação: id número inteiro:
    if (!Number.isInteger(id)) {
        return res.status(400).json( {message: 'O id fornecido precisa ser do tipo inteiro!'} )
    }

    customers = customers.filter((customer) => customer.id !== id);

    res.json({ message: `Cliente com id ${id} apagado com sucesso` })
}

module.exports = {
    getAllCustomers,
    getCustomer,
    addCustomer,
    updateCustomer,
    deleteCustomer
}