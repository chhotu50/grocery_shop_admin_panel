import axios from "axios";

const Product = {
    list: () => {
        return axios.get("product");
    },
    add: (payload) => {
        let data = Product.toFormData(payload);
        console.log(data);
        return axios
            .post("product", data, {
                headers: { Authorization: localStorage.getItem("user.token") },
            })
            .then((res) => {
                console.log(res);
            });
    },
    remove: (id) => {
        return axios.delete("product/" + id, {
            headers: { Authorization: localStorage.getItem("user.token") },
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
