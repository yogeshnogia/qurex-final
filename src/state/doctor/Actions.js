export const ADD_DATA = 'ADD_DATA';

export const addData = (payload) => {
  return {
    type: 'ADD_DATA',
    payload: payload,
  };
};
