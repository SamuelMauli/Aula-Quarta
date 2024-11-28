'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);  // Obtém o nome do arquivo atual
const env = process.env.NODE_ENV || 'development';  // Pega o ambiente (desenvolvimento por padrão)
const config = require(__dirname + '/../config/config.json')[env];  // Configuração do banco de dados
const db = {};  // Objeto para armazenar os modelos

let sequelize;
if (config.use_env_variable) {
  // Se usar variável de ambiente para conexão
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // Caso contrário, usa-se o arquivo de configuração
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Lê os arquivos do diretório, excluindo o próprio arquivo index.js e os arquivos de teste
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&  // Não pega arquivos ocultos
      file !== basename &&  // Não pega o próprio index.js
      file.slice(-3) === '.js' &&  // Só pega arquivos .js
      file.indexOf('.test.js') === -1  // Não pega arquivos de teste
    );
  })
  .forEach(file => {
    // Importa os modelos dinamicamente
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;  // Adiciona o modelo ao objeto db
  });

// Associa os modelos, caso tenham associações
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);  // Associa os modelos entre si
  }
});

db.sequelize = sequelize;  // Adiciona a instância do sequelize ao objeto db
db.Sequelize = Sequelize;  // Adiciona o Sequelize ao objeto db

module.exports = db;  // Exporte os modelos e a instância do sequelize
