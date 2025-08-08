// основной файл где создаются данные и функционал




const initialState = {

  isActiveUser: {},



};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        users: [
          ...state.users,
          {
            id: state.users.length + 1,
            name: action.payload.name,
            surname: action.payload.surname,
            level: 1,
          },
        ],
      };
    case "SECOND_LEVEL":
      return {
        ...state,
        users: state.users.map((item) => {
          if (item.id === action.payload && item.level < 3) {
            return { ...item, level: item.level + 1 };
          }
          return item;
        }),
      };
    case "ACTIVE_USER":
      return {
        ...state,
        isActiveUser: action.payload
      };
    case "GET_DATA":
      return {
        ...state,
        dogImg: action.payload,
      };
    case "CATEGORY":
      return {
        ...state,
        Category: action.payload
      };
    case "CHECK_VALUE":
      console.log(state.users);
    default:
      return state;
  }
};

export default itemReducer;
