import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
   static init(sequelize) {
      super.init(
         {
            // super é a classe pai, no caso o Model, metodo init da classe model
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
         },
         {
            sequelize,
         }
      );

      this.addHook('beforeSave', async user => {
         if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8);
         }
      });

      // retorna o model que foi inicializado
      return this;
   }

   // verifica se a senha informada pelo usuario corresponde com a cadastrada
   checkPassword(password) {
      return bcrypt.compare(password, this.password_hash);
   }
}

export default User;
