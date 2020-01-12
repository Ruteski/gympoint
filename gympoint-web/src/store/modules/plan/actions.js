export function planListRequest() {
   return {
      type: '@plan/LIST_REQUEST',
   };
}

export function planDetails(data) {
   return {
      type: '@plan/LIST_SUCCESS',
      payload: { data },
   };
}

export function planPriceUpdate(data) {
   return {
      type: '@plan/PRICE_UPDATE_REQUEST',
      payload: { data },
   };
}
