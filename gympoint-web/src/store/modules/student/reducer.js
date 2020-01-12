import produce from 'immer';

const INITIAL_STATE = {
   students: [],
   student: null,
   loading: false,
};

export default function students(state = INITIAL_STATE, action) {
   return produce(state, draft => {
      switch (action.type) {
         case '@student/LIST_REQUEST': {
            draft.students = action.data;
            draft.loading = true;
            break;
         }

         case '@student/LIST_SUCCESS': {
            draft.students = action.data;
            draft.loading = false;
            break;
         }

         case '@student/DETAILS_REQUEST': {
            draft.loading = false;
            break;
         }

         default:
      }
   });
}
