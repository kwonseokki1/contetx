import React, { useEffect, useState } from "react";
import {
  usePostDispatchContext,
  usePostStateContext,
} from "../../contexts/PostsContext";
import { getPosts } from "../../contexts/PostsContext";
import { Post } from "../post/Post";

const Posts = () => {
  const state = usePostStateContext();
  const dispatch = usePostDispatchContext();
  const [postId, setPostId] = useState(null);
  const { loading, data: posts, error } = state.posts;

  useEffect(() => {
    getPosts(dispatch);
  }, []);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error...</div>;
  if (posts)
    return (
      <>
        <ul>
          {posts.map((post) => (
            <li
              key={post.id}
              onClick={() => {
                setPostId(post.id);
              }}
            >
              {post.body}
            </li>
          ))}
        </ul>

        {postId && <Post id={postId} />}
      </>
    );
};

export { Posts };
