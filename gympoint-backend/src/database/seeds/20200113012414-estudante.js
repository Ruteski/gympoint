module.exports = {
   up: QueryInterface => {
      return QueryInterface.bulkInsert(
         'students',
         [
            {
               name: 'Aluno 1',
               email: 'aluno1@gympoint.com',
               idade: 25,
               peso: 95.854,
               altura: 1.78,
               created_at: new Date(),
               updated_at: new Date(),
            },
            {
               name: 'Aluno 2',
               email: 'aluno2@gympoint.com',
               idade: 18,
               peso: 78.51,
               altura: 1.74,
               created_at: new Date(),
               updated_at: new Date(),
            },
         ],
         {}
      );
   },

   down: () => {},
};
