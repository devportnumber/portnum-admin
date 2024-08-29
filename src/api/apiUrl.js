export let API_URL = `${process.env.REACT_APP_API_URL}`

export const API = {
  // 팝업 목록 GET
  POPUP_LIST: `${URL}/popup`, // {adminId} filter params

  // 팝업 상세 목록 GET
  POPUP_DETAIL: `${URL}/popup/`, // {adminId}/{popupId}

  // 팝업 등록 POST
  // 팝업 수정 PATCH
  // 팝업 다중 삭제 DELETE
  POPUP: `${URL}/popup`,

  // 이미지 S3 PreSignedUrl 저장 GET
  IMAGE_ADD: `${URL}/image`, // imageName={파일이름}
  // 팝업 이미지 추가 POST
  // 팝업 이미지 수정 PATCH
  // 팝업 이미지 삭제 DELETE
  POPUP_IMG: `${URL}/popup/img`,
}
