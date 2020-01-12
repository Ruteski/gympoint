// esse arquivo mapeia todas as models do sistema

import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import databaseConfig from '../config/database'; // configuração da conexão com o banco de dados
import User from '../app/models/Users'; // model do usuario
import Student from '../app/models/Students';
import Plans from '../app/models/Plans';
import Registrations from '../app/models/Registrations';
import Checkin from '../app/models/Checkins';
import HelpOrder from '../app/models/HelpOrders';

const models = [User, Student, Plans, Registrations, Checkin, HelpOrder]; // array que conterá todas as models do sistema

class Database {
   constructor() {
      this.init();
   }

   init() {
      this.connection = new Sequelize(databaseConfig); // cria conexão com o banco de dados

      models
         .map(model => model.init(this.connection)) // mapeia todos os models do sistema e passa a conexao do bd para elas
         .map(
            model => model.associate && model.associate(this.connection.models)
         ); // mapeia todos os associates que existirem dentro das models
   }

   mongo() {
      this.mongo.connection = mongoose.connect(
         'mongodb://localhost:27017/gympoint',
         {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
         }
      );
   }
}

export default new Database();
