export function registrationEditRequest(data) {
   return {
      type: '@registration/EDIT_DETAILS',
      payload: { data },
   };
}

export function registrationEditSuccess(data) {
   return {
      type: '@registration/EDIT_SUCCESS',
      payload: { data },
   };
}
