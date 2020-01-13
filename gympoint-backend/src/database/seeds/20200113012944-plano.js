module.exports = {
   up: QueryInterface => {
      return QueryInterface.bulkInsert(
         'plans',
         [
            {
               name: 'Start',
               duration: 1,
               price: 129,
               created_at: new Date(),
               updated_at: new Date(),
            },
            {
               name: 'Silver',
               duration: 3,
               price: 109.95,
               created_at: new Date(),
               updated_at: new Date(),
            },
            {
               name: 'Gold',
               duration: 6,
               price: 89.9,
               created_at: new Date(),
               updated_at: new Date(),
            },
         ],
         {}
      );
   },

   down: () => {},
};
