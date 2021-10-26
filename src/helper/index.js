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
  BASEURL: "http://192.168.1.4:4000/",
  ROLE,
  STATUS,
  YESNO,
  REGEX,
};
