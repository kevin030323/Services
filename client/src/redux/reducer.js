const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {},
  posts: [],
};

function setInLocalStorage(key, state) {
  localStorage.setItem(key, JSON.stringify(state));
  return state;
}

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case "GET_SERVICES":
      return { ...state, posts: payload };
    case "LOGIN":
      return { ...state, user: setInLocalStorage("user", payload) };
    case "LOG_OUT":
      return { ...state, user: setInLocalStorage("user", {}) };
    case "CREATEA_ACCOUNT":
      return { ...state, user: setInLocalStorage("user", payload) };
    case "SEARCH_NAME":
      let filterPost = state.posts.filter((element) =>
        element.title.toLowerCase().includes(payload.toLowerCase())
      );
      return { ...state, posts: filterPost };

    default:
      return { ...state };
  }
}
