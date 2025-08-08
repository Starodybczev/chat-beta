// export const plusNumber = () => ({
//   type: "PLUS_NUMBER",
// });

export const addUser = (name, surname) => ({
  type: "ADD_USER",
  payload: {
    name,
    surname,
  },
});
export const secondLevel = (id) => ({
  type: "SECOND_LEVEL",
  payload: id
});
export const checkValue = () => ({
  type: "CHECK_VALUE",
});
export const getData = (item) => ({
  type: "GET_DATA",
  payload: item
});
export const activeUser = (id, email ) => ({
  type: "ACTIVE_USER",
  payload: {id , email}
});

export const Category = (id, name) => ({
  type: "CATEGORY",
  payload: {id, name}
});

// export const deleteUser = (index) => ({
//     type: "DELETE_USER",
//     payload: index,
//   });
