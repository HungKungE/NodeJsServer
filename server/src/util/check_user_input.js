const checkId = (ID) => {
  // 그냥 ID로 바꾸자
  // ID -> 5글자 이상, 20글자 이하
  // 영어, 숫자만 허용
  const checkChars = new RegExp("^[a-zA-Z\\d가-힣]{3,20}$");

  console.log(ID);

  return checkChars.test(ID) && typeof ID !== "undefined";
};

const checkPassword = (password) => {
  /*
      ^[ ] : 대괄호 안의 문자로 시작한다.
      a-zA-Z : 영어문자
      \\d : 숫자 (\d 로도 표현함, 언어마다 escape 기준이 다른듯함)
      대괄호 나머지 부분 : 특수문자들
      {8,24}$ : 8-24자리수를 허용하며, 중괄호 안의 문자로 끝난다($)
  */
  const checkChars = new RegExp("^[a-zA-Z\\d`~!@#$%^&*()-_=+]{8,24}$");

  return checkChars.test(password) && typeof password !== "undefined";
};

module.exports = {
  checkId,
  checkPassword,
};
