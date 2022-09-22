import axios from "axios";

// 게시물 전체가져오기
export const getPosts = async () => {
  const response = await axios.get("https://mockend.com/mockend/demo/posts");
  return response.data;
};

export const getPost = async (id) => {
  const response = await axios.get(
    `https://mockend.com/mockend/demo/posts/${id}`
  );
  return response.data;
};
