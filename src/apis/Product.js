import axios from "axios";

const Product = {
    list: () => {
        return axios.get("product");
    },
    add: (payload) => {
        let data = Product.toFormData(payload);
        return axios.post("product", data, {
            headers: { token: localStorage.getItem("user.token") },
        });
    },
    remove: (id) => {
        return axios.delete("product/" + id, {
            headers: { token: localStorage.getItem("user.token") },
        });
    },
    removeMultiple: (data) => {
        return axios.post("product/multiple-delete", data, {
            headers: { token: localStorage.getItem("user.token") },
        });
    },

    update: (id, data) => {
        return axios.put("product/" + id, data, {
            headers: { token: localStorage.getItem("user.token") },
        });
    },
    showOne: (id) => {
        return axios.get("products/" + id);
    },
    toFormData: (payload) => {
        const formData = new FormData();
        for (let key in payload) {
            formData.append(key, payload[key]);
        }
        return formData;
    },
};
export default Product;
