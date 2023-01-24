import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { postSliceType } from "../assets/interfaces";
import { fetchUsers } from "../store/slices/postFn";
import { setUsers } from "../store/slices/posts";

const UserView = () => {
  const params = useParams();
  const userData = useSelector(({ posts }: { posts: postSliceType }) =>
    posts.userList.find((x) => params?.id && parseInt(params?.id, 10) === x.id)
  );
  const dispatch = useDispatch();
  async function getUserList() {
    const data = await fetchUsers();
    dispatch(setUsers(data));
  }
  useEffect(() => {
    if (!userData) {
      getUserList();
    }
  }, [userData]);
  return (
    <div className="container">
      <h2 className="text-center">User Details</h2>
      {userData && (
        <div className="user-data">
          <Link to="/" className="link-styles">
            Go Back
          </Link>
          <h4 style={{ marginTop: "1rem" }}>{userData.name}</h4>
          <div className="sep">
            <p>{userData.address.city}</p>
            <p className="blue">{userData.email}</p>
            <p>{userData.phone}</p>
            <p className="blue">{userData.website}</p>
          </div>
          <div>
            <h3>Company Details</h3>
            <div className="sep">
              <p>{userData.company.name}</p>
              <p>{userData.company.bs}</p>
            </div>
          </div>
          <div>
            <h3>Address</h3>
            <div className="sep">
              <p>{userData.address.street}</p>
              <p>{userData.address.suite}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default UserView;
