import React, { useEffect } from "react";
import {
  usePostDispatchContext,
  usePostStateContext,
} from "../contexts/PostsContext";
import { getPosts } from "../apis/getPost";
const Posts = () => {
  const state = usePostStateContext();
  const dispatch = usePostDispatchContext();
  const { loading, data: posts, error } = state.posts;
  useEffect(() => {
    getPosts(dispatch);
  }, []);

  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;
  if (posts)
    return (
      <ul>
        {posts.map((post) => (
          <li>{post.body}</li>
        ))}
      </ul>
    );
};

export { Posts };
