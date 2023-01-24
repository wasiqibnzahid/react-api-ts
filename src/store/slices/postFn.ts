import { makeApiCall } from "../../mixins";
export const fetchPosts = async () => {
  return await makeApiCall({
    url: "posts",
    method: "GET",
  });
};

export const fetchUsers = async () => {
  return await makeApiCall({
    url: "users",
    method: "GET",
  });
};

export const fetchComments = async (postId: string | number) => {
  return await makeApiCall({
    url: `posts/${postId}/comments`,
    method: "GET",
  });
};
