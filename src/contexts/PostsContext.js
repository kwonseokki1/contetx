import { useReducer, useContext, createContext } from "react";

// 초기 데이터 형식정하기
const initialStatePost = {
  posts: {
    loading: false,
    data: null,
    error: false,
  },
  post: {
    loading: false,
    data: null,
    error: false,
  },
};

// 액션상태 반환
const getPostloading = {
  loading: true,
  data: null,
  error: null,
};
const getPostSuccess = (data) => ({ loading: false, data, error: false });
const getPostFailded = (e) => ({ loading: false, data: null, error: e });

function getPostReducer(state, action) {
  switch (action.type) {
    case "GET_POSTS":
      return {
        ...state,
        posts: getPostloading,
      };
    case "GET_POSTS_SUCCESS":
      return {
        ...state,
        posts: getPostSuccess(action.data),
      };
    case "GET_POSTS_ERROR":
      return {
        ...state,
        posts: getPostFailded(action.error),
      };
    default:
      throw new Error(`Unhandled action type : ${action.type}`);
  }
}

const PostStateProvider = createContext(null);
const PostDispatchProvider = createContext(null);
export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(getPostReducer, initialStatePost);

  return (
    <PostStateProvider.Provider value={state}>
      <PostDispatchProvider.Provider value={dispatch}>
        {children}
      </PostDispatchProvider.Provider>
    </PostStateProvider.Provider>
  );
};

export const usePostStateContext = () => {
  const state = useContext(PostStateProvider);
  return state;
};

export const usePostDispatchContext = () => {
  const dispatch = useContext(PostDispatchProvider);
  return dispatch;
};
