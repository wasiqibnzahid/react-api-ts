import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { postListType, postSliceType } from "../assets/interfaces";
import { fetchPosts, fetchUsers } from "../store/slices/postFn";
import { setPosts, setUsers } from "../store/slices/posts";

const LandingView = () => {
  const dispatch = useDispatch();
  async function fetchPostData() {
    const postData: postListType[] = await fetchPosts();
    const userData: any = await fetchUsers();
    dispatch(setPosts(postData));
    dispatch(setUsers(userData));
  }
  useEffect(() => {
    fetchPostData();
    const clickListener = (e: any) => {
      if (e.target.id !== "search-input") {
        setSearchFinalized(true);
      } else {
        setSearchFinalized(false);
      }
    };
    document.addEventListener("click", clickListener);
    return () => document.removeEventListener("click", clickListener);
  }, []);
  const handleSelect = (id: number, search: string) => {
    setSelectedId(id);
    setSearchFinalized(true);
    editSearchValue(search);
  };
  const storeData = useSelector(({ posts }: { posts: postSliceType }) => posts);
  const { postList: postData, userList } = storeData;
  const [searchValue, editSearchValue] = useState("");
  const [selectedId, setSelectedId] = useState(-1);
  const [searchFinalized, setSearchFinalized] = useState(true);
  const postList = useMemo(() => {
    if (selectedId === -1) {
      return postData;
    }
    return postData.filter((x) => x.userId === selectedId);
  }, [postData, searchFinalized, selectedId]);
  const setSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    editSearchValue(value);
    setSearchFinalized(false);
    if (value === "") {
      setSelectedId(-1);
    }
  };
  const searchSuggestions = useMemo(
    () =>
      userList.filter((x) =>
        x.name.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [userList, searchValue]
  );
  return (
    <div className="landing-content">
      <h2 className="text-center">Landing</h2>
      <div className="search-input">
        <input
          type="search"
          value={searchValue}
          id="search-input"
          onFocus={(e) => {
            if (e.target.value === "") {
              setSearchFinalized(false);
            }
          }}
          onChange={setSearchValue}
        />
        {!searchFinalized && (
          <div>
            {searchSuggestions.map((x) => (
              <div
                key={x.id}
                onClick={() => {
                  handleSelect(x.id, x.name);
                }}
              >
                {x.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="posts-container">
        {postList.map((x) => {
          const user = userList.find((item) => item.id === x.userId);

          return (
            <div key={x.id}>
              <Link to={`/post/${x.id}`}>
                <div>
                  <h5>{x.title}</h5>
                  <p>{x.body}</p>
                </div>
                <Link to={`/user/${user?.id}`}>
                  <p className="user-link">Author - {user?.name}</p>
                </Link>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default LandingView;
