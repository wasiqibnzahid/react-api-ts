import axios from "axios";

const makeApiCall = async ({
  url,
  method,
  data,
}: {
  url: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  data?: unknown;
}) => {
  return await axios({
    method,
    data,
    url: `https://jsonplaceholder.typicode.com/${url}`,
  })
    .then((res) => res.data)
    .catch((e) => e);
};

export { makeApiCall };
