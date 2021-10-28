import axios from "axios";

const User = {
  list: () => {
    return axios.get("user/list", {
      headers: { token: localStorage.getItem("user.token") },
    });
  },
  add: (payload) => {
    return axios.post("users", payload, {
      headers: { Authorization: localStorage.getItem("user.token") },
    });
  },
  showOne: (id) => {
    return axios.get("users/" + id, {
      headers: { Authorization: localStorage.getItem("user.token") },
    });
  },
  edit: (payload, id) => {
    return axios.put("users/" + id, payload, {
      headers: { Authorization: localStorage.getItem("user.token") },
    });
  },
};

export default User;
