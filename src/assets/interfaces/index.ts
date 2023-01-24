export interface postListType {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export interface userType {
  id: number;
  number: string;
  username: string;
  name: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface commentType {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
export interface postSliceType {
  postList: postListType[];
  userList: userType[];
  commentData: {
    selectedId: string;
    commentList: commentType[];
  };
}
