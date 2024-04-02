const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('web3atv05', 'root', ' ', {
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

/// User
const user = sequelize.define('user', {
    id_user: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: true
    },
    data_ingresso: {
        type: Sequelize.DATE,
        allowNull: true
    },
    ultimoip: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

/// Board
const board = sequelize.define('board', {
    id_board: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false

    },
    mensagem: {
        type: Sequelize.TEXT,
        allowNull: false
    }


});

/// Thread
const thread = sequelize.define('thread', {
    id_thread: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        utoIncrement: true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: true
    },
    mensagem: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    arquivo: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    board_idboard: {
        type: Sequelize.INTEGER,
        references: {
            model: 'board',
            key: 'id_board'
        }
    },
    user_iduser: {
        type: Sequelize.INTEGER,
        references: {
            model: 'user',
            key: 'id_user'
        }
    }
    ,
    data_criacao: {
        type: Sequelize.DATE,
        allowNull: true
    },
    ip: {
        type: Sequelize.STRING,
        allowNull: true
    },
    clicks: {
        type: Sequelize.BIGINT,
        allowNull: true
    }





});

/// answer
const answer = sequelize.define('answer', {
    id_aswer: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        utoIncrement: true
    },
    mensagem: {
        type: Sequelize.STRING,
        allowNull: true
    },
    arquivo: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    arquivo: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    thread_idthread: {
        type: Sequelize.INTEGER,
        references: {
            model: 'thread',
            key: 'id_thread'
        }
    },
    user_iduser: {
        type: Sequelize.INTEGER,
        references: {
            model: 'user',
            key: 'id_user'
        }
    }
    ,
    data_criacao: {
        type: Sequelize.DATE,
        allowNull: true
    },
    ip: {
        type: Sequelize.STRING,
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
    board,
    thread,
    answer,
    user
}