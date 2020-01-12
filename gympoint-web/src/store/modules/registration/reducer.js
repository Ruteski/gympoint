import produce from 'immer';

const INITIAL_STATE = {
   registration: null,
};

export default function registration(state = INITIAL_STATE, action) {
   return produce(state, draft => {
      switch (action.type) {
         case '@registration/EDIT_DETAILS': {
            draft.registration = action.payload.data;
            break;
         }

         default:
      }
   });
}
