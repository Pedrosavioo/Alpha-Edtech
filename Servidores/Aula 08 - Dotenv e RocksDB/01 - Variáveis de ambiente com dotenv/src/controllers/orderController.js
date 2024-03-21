let orders = [
    { 
        id: 1,
        id_customer: 1,
        items: [
            { 
                id_product: 1,
                quantity: 1,
            }
        ]
    },
    {
        id: 2, 
        id_customer: 2,
        items: [
            { 
                id_product: 1,
                quantity: 1,
            },
            { 
                id_product: 2,
                quantity: 1,
            },
            { 
                id_product: 3,
                quantity: 2,
            }
        ]
    },
    {
        id: 3, 
        id_customer: 2,
        items: [
            { 
                id_product: 2,
                quantity: 1,
            },
            { 
                id_product: 3,
                quantity: 2,
            }
        ]
    },
    { 
        id: 1,
        id_customer: 3,
        items: [
            { 
                id_product: 3,
                quantity: 1,
            },
            { 
                id_product: 2,
                quantity: 1,
            },
            { 
                id_product: 1,
                quantity: 4,
            }
        ]
    }
]

let nextOrdesId = orders.length + 1;

const getAllOrders = (req, res) => {
    res.json(orders);
}

const getOrder = (req, res) => {
    const productId = Number(req.params.id);
    
    // Validação: id é um número inteiro:
    if (!Number.isInteger(productId)) {
        throw res.status(400).json({ message: 'O id fornecido precisa ser um número inteiro!' });
    }
    res.json(orders[productId]);
}

const getOrdersProduct = (req, res) => {
    // chave: product_id
    if (req.query.product_id) {
        try {
            const id_product = parseInt(req.query.product_id);

            // Validação: id é um número inteiro:
            if (!Number.isInteger(id_product)) {
                throw res.status(400).json({ message: 'O id fornecido precisa ser um número inteiro!' });
            }
        
            const ordersWithProduct = orders.filter(order => {
                return order.items.some(item => item.id_product === id_product);
            });

            res.json({ ordersWithProduct });
        } catch(err) {
            console.error("Erro ao obter pedidos com produto específico:", err);
            res.status(500).json({ error: "Ocorreu um erro ao obter pedidos com produto específico." });
        }   
    }

    // chave: customer_id
    if (req.query.customer_id) {
        try {
        const id_customer = parseInt(req.query.customer_id);

        // Validação: id é um número inteiro:
        if (!Number.isInteger(id_customer)) {
            throw res.status(400).json({ message: 'O id fornecido precisa ser um número inteiro!' });
        }
    
        const ordersWithProduct = orders.filter(order => order.id_customer === id_customer);

        res.json({ ordersWithProduct });
        } catch(err) {
            console.error("Erro ao obter pedidos do cliente:", err);
            res.status(500).json({ error: "Ocorreu um erro ao obter pedidos do cliente." });
        }   
    }
}

const addOrder = (req, res) => { // adicionar
    const { id_customer, items } = req.body;

    const id = parseInt(id_customer);
    
    // Validação: id é um número inteiro:
    if (!Number.isInteger(id)) {
        return res.status(400).json({ message: 'O id fornecido precisa ser um número inteiro!' });
    }
    
    // Validação: Um pedido deve ter sempre um cliente associado
    if (!id_customer) {
        return res.status(400).json({ message: 'Por favor, informe o id do cliente associado ao pedido!' });
    }
    
    // Validação: pelo menos um produto para fazer pedido
    if (items.length < 1) {
        return res.status(400).json({ message: 'Necessário pelo menos um produto para fazer pedido!' });
    }
    
    const newOrder = { id: nextOrdesId++, id_customer: id_customer, items: items };
    
    orders.push(newOrder);
    res.status(201).json(newOrder);
}

const updateOrder = (req, res) => { // atualizar
    const orderId = parseInt(req.params.id);
    const items = req.body;

    // Validação: id é um número inteiro:
    if (!Number.isInteger(orderId)) {
        return res.status(400).json({ message: 'O id fornecido precisa ser um número inteiro!' });
    }

    const orderIndex = orders.findIndex((order) => order.id === orderId);

    if(orderIndex === -1){
        return res.status(404).json({ error: "Pedido não encontrado!" })
    }

    orders[orderIndex] = { ...orders[orderIndex], items: items };
    res.status(200).json({ message: `Pedidio do id ${orderIndex} atualizado...` })
}

const deleteOrder = (req, res) => { // Apagar
    const orderId = parseInt(req.params.id);

    // Validação: id é um número inteiro:
    if (!Number.isInteger(orderId)) {
        return res.status(400).json({ message: 'O id fornecido precisa ser um número inteiro!' });
    }

    orders = orders.filter((order) => order.id !== orderId);

    res.json({ message: `Produto com ID ${orderId} excluído` })
}

module.exports = {
    getAllOrders,
    getOrder,
    getOrdersProduct,
    addOrder,
    updateOrder,
    deleteOrder
}