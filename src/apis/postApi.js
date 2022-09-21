import axios from "axios";

// 게시물 전체가져오기
export const getPosts = async (dispatch) => {
  dispatch({ type: "GET_POSTS" });
  try {
    const res = await axios.get("https://mockend.com/mockend/demo/posts");
    dispatch({ type: "GET_POSTS_SUCCESS", data: res.data });
  } catch (e) {
    dispatch({ type: "GET_POSTS_ERROR" });
  }
};
