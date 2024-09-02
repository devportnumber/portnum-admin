import axios from 'axios'

// S3 PreSignedUrl 저장
export default async function getPreSignedURL(preSingedUrl) {
  try {
    const res = await axios.put(preSignedUrl, {
      headers: {
        'Content-Type': 'image/*', // 파일의 Content-Type 설정
      },
    })

    if (res.status === 200) {
      console.log('S3 업로드 성공:', res)
    } else {
      console.log('S3 업로드 실패:', res)
    }
  } catch (error) {
    console.error('S3 업로드 중 오류 발생:', error)
  }
}
