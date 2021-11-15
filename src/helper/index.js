const REGEX = require("./Regex");

const ROLE = {
    ADMIN: 1,
    CUSTOMER: 2,
};
const STATUS = {
    ACTIVE: 1,
    DEACTIVE: 2,
    DELETED: 3,
};

const YESNO = {
    YES: 1,
    NO: 0,
};

export const helper = {
    BASEURL: "https://groceryshop-api.herokuapp.com/",
    IMAGE_BASEURL: "https://groceryshop-api.herokuapp.com",
    // BASEURL: "http://localhost:4000/",
    // IMAGE_BASEURL: "http://localhost:4000",
    ROLE,
    STATUS,
    YESNO,
    REGEX,
};
