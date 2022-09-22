import { useReducer, useContext, createContext } from "react";
import * as api from "../apis/postApi";
import createAsyncDispatcher, {
  createAsyncHandler,
} from "../async/asyncActionUtils";
import { initialAsyncState } from "../async/asyncActionUtils";
// 초기 데이터 형식정하기
const initialStatePost = {
  posts: initialAsyncState,
  post: initialAsyncState,
};

// 액션상태 반환

const postsHandler = createAsyncHandler("GET_POSTS", "posts");
const postHandler = createAsyncHandler("GET_POST", "post");

function getPostReducer(state, action) {
  switch (action.type) {
    case "GET_POSTS":
    case "GET_POSTS_SUCCESS":
    case "GET_POSTS_ERROR":
      return postsHandler(state, action);
    case "GET_POST":
    case "GET_POST_SUCCESS":
    case "GET_POST_ERROR":
      return postHandler(state, action);
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

// 단순히 context를 쉽게 사용하기 위한 hook
export const usePostStateContext = () => {
  const state = useContext(PostStateProvider);
  return state;
};

export const usePostDispatchContext = () => {
  const dispatch = useContext(PostDispatchProvider);
  return dispatch;
};

export const getPosts = createAsyncDispatcher("GET_POSTS", api.getPosts);
export const getPost = createAsyncDispatcher("GET_POST", api.getPost);
