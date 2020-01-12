import produce from 'immer';

const INITIAL_STATE = {
   signed: false,
   student: null,
};

export default function user(state = INITIAL_STATE, action) {
   return produce(state, draft => {
      switch (action.type) {
         case '@student/SIGN_IN_SUCCESS': {
            draft.student = action.payload.studentId;
            draft.signed = action.payload.signed;
            break;
         }

         case '@student/SIGN_FAILURE': {
            draft.signed = false;
            break;
         }

         default:
      }
   });
}
