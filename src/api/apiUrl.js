export let API_URL = `${process.env.REACT_APP_API_URL}`

export const API = {
  // ⭐️[회원]
  SIGN_UP: `${URL}/admin/signup`,
  VALID_NICKNAME: `${URL}/admin/valid/nickName`, // 닉네임 중복체크
  VALID_LOGINID: `${URL}/admin/valid/loginId`, // 아이디 중복체크

  // ⭐️[찾기]
  LOST_ID: `${URL}/admin/lost/loginId`,
  LOST_PW: `${URL}/admin/lost/password`,

  // ⭐️[인증]
  LOGIN: `${URL}/auth/login`,
  LOGOUT: `${URL}/auth/logout`,
  TOKEN_REISSUE: `${URL}/auth/reissue`, // 토큰 재생성

  // ⭐️[팝업]
  // 팝업 목록 GET
  POPUP_LIST: `${URL}/admin/popup`, // {adminId} filter params
  // 팝업 상세 목록 GET
  POPUP_DETAIL: `${URL}/admin/popup/`, // {adminId}/{popupId}
  // 팝업 등록 POST
  POPUP_SAVE: `${URL}/admin/popup/`,
  // 팝업 수정 PATCH
  POPUP_UPDATE: `${URL}/admin/popup/`,
  // 팝업 다중 삭제 DELETE
  POPUP_DELETE: `${URL}/admin/popup`,
  // 팝업 이미지 불러오기 GET
  POPUP_IMG: `${URL}/popup/img`,
}
