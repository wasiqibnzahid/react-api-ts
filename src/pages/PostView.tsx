import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { postSliceType } from "../assets/interfaces";
import { fetchComments, fetchPosts, fetchUsers } from "../store/slices/postFn";
import { setComments, setPosts, setUsers } from "../store/slices/posts";
const PostView = () => {
  const params: {
    id?: string;
  } = useParams();
  const postData = useSelector(({ posts }: { posts: postSliceType }) =>
    posts.postList.find((x) => params?.id && x.id === parseInt(params.id, 10))
  );
  const userData = useSelector(({ posts }: { posts: postSliceType }) =>
    posts.userList.find((x) => x.id === postData?.userId)
  );
  const commentData = useSelector(
    ({ posts }: { posts: postSliceType }) => posts.commentData
  );
  const dispatch = useDispatch();

  async function getPostData() {
    const data = await fetchPosts();
    dispatch(setPosts(data));
  }
  async function getUserData() {
    const data = await fetchUsers();
    dispatch(setUsers(data));
  }
  async function getPostComments() {
    if (params?.id) {
      const data = await fetchComments(params.id);
      dispatch(
        setComments({
          selectedId: params.id,
          commentList: data,
        })
      );
    }
  }

  useEffect(() => {
    if (params?.id && commentData.selectedId !== params.id) {
      console.log("got called");
      getPostComments();
    }
    if (!postData) {
      getPostData();
    }
    if (postData && !userData) {
      getUserData();
    }
  }, [userData, postData]);
  return (
    <div className="container post-view">
      <h2 className="text-center">Post View</h2>
      <Link className="link-styles" to="/">
        Back to home{" "}
      </Link>
      <h3>{postData?.title}</h3>
      <p>{postData?.body}</p>
      {userData && (
        <Link className="link-styles" to={`/user/${userData.id}`}>
          {userData.email}
        </Link>
      )}
      <h4 className="comments text-center">Comments</h4>
      {commentData.selectedId === params?.id && (
        <div className="comment-container">
          {commentData.commentList.map((x) => (
            <div key={x.id}>
              <h4>{x.name}</h4>
              <p>{x.email}</p>
              <p>{x.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostView;
