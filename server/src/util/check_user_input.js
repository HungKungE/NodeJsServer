const check_email = (email) => {
  // 그냥 ID로 바꾸자
  // ID -> 5글자 이상, 20글자 이하
  // 영어, 숫자만 허용
  const checkChars = new RegExp("^[a-zA-Z\\d]{5,20}$");

  return checkChars.test(email);
};

const check_password = (password) => {
  /*
      ^[ ] : 대괄호 안의 문자로 시작한다.
      a-zA-Z : 영어문자
      \\d : 숫자 (\d 로도 표현함, 언어마다 escape 기준이 다른듯함)
      대괄호 나머지 부분 : 특수문자들
      {8,24}$ : 8-24자리수를 허용하며, 중괄호 안의 문자로 끝난다($)
  */
  const checkChars = new RegExp("^[a-zA-Z\\d`~!@#$%^&*()-_=+]{8,24}$");

  return checkChars.test(password);
};

module.exports = {
  checkEmail: check_email,
  checkPassword: check_password,
};
