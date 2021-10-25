import axios from "axios";

const Category = {
    list: () => {
        return axios.get("categories");
    },
    add: (payload) => {
        let data = Category.toFormData(payload);
        return axios.post("categories", data, {
            headers: { Authorization: localStorage.getItem("user.token") },
        });
    },
    showOne: (id) => {
        return axios.get("categories/" + id);
    },
    edit: (payload, id) => {
        let data = Category.toFormData(payload);
        return axios.post("/updateData/", data, {
            headers: { Authorization: localStorage.getItem("user.token") },
        });
    },
    remove: (id) => {
        return axios.delete("categories/" + id, {
            headers: { Authorization: localStorage.getItem("user.token") },
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

export default Category;
