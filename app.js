const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('web3atv04', 'aluno', 'ifpecjbg', {
    dialect: 'mysql',
    host: 'localhost',
});


// testando a conexão

sequelize.authenticate()
    .then(() => {
        console.log('Conexão bem sucedida com o banco de dados');
    })

    .catch(err => {
        console.error('Erro ao conectar ao banco de dados', err)
    });

////tabelas do banco

/// Categoria
const Categoria = sequelize.define('categoria', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false

    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }


});

/// Produtos
const Produtos = sequelize.define('produtos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        utoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: true
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    preco: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
    },
    id_categoria: {
        type: Sequelize.INTEGER,
        references: {
            model: 'categoria',
            key: 'id'
        }
    },
    disponivel: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    }




});

/// Clientes
const Clientes = sequelize.define('clientes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: true
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: true

    }
});

/// Pedidos
const Pedidos = sequelize.define('pedidos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_cliente: {
        type: Sequelize.INTEGER,
        references: {
            model: 'clientes',
            key: 'id'
        }
    },
    data_pedido: {
        type: Sequelize.DATE,
        allowNull: true
    },
    status: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

/// ItensPedido 
const Itenspedido = sequelize.define('itenspedido', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_pedido: {
        type: Sequelize.INTEGER,
        references: {
            model: 'pedidos',
            key: 'id'
        }

    },
    id_produto: {
        type: Sequelize.INTEGER,
        references: {
            model: 'produtos',
            key: 'id'
        }
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    preco_unitario: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true

    }
});


/// Sincronizando os modelos com o bano de dados

sequelize.sync()
    .then(() => {
        console.log('Modleo sincronizado com o banco de dados')
    })
    .catch(err => {
        console.error('erro ao sincronizar modelos: ', err)
    });

/// Exportnado os modelos e a conexão

module.exports = {
    sequelize,
    Categoria,
    Produtos,
    Clientes,
    Pedidos,
    Itenspedido
}