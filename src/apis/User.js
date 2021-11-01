import axios from "axios";

const User = {
    list: () => {
        return axios.get("user/list", {
            headers: { token: localStorage.getItem("user.token") },
        });
    },
    add: (payload) => {
        return axios.post("users", payload, {
            headers: { token: localStorage.getItem("user.token") },
        });
    },
    showOne: (id) => {
        return axios.get("user/" + id, {
            headers: { token: localStorage.getItem("user.token") },
        });
    },
    remove: (id) => {
        return axios.delete("user/" + id, {
            headers: { token: localStorage.getItem("user.token") },
        });
    },
    edit: (payload, id) => {
        return axios.put("users/" + id, payload, {
            headers: { token: localStorage.getItem("user.token") },
        });
    },

    profilePhoto: (payload) => {
        let data = User.toFormData(payload);
        return axios.post("user/profilePhotoChange", data, {
            headers: { token: localStorage.getItem("user.token") },
        });
    },
    toFormData: (payload) => {
        const formData = new FormData();
        for (let key in payload) {
            formData.append(key, payload[key]);
        }
        return formData;
    },
};

export default User;
