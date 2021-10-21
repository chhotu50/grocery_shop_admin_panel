const Regex = {
  MOBILE_REGEX: /^[6-9]\d{9}$/,
  EMAIL_REGEXP:
    /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+(?:[a-zA-Z]{2}|aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel)$/,
  FULL_NAME_REGEX: /^[a-zA-Z ]+$/,
  NAME_REGEX: /^[a-zA-Z]+$/,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/,
  NUMERIC_REGEX: /[^0-9]/g,
};

export default Regex;
