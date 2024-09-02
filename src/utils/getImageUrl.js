import { useAxios } from '../hooks/useAxios'

// API : S3 PreSignedUrl 요청
const {
  fetchData: imageGetApi,
  loading2,
  data: imageGetData,
  error: error2,
} = useAxios()

export default function getImageUrl(imageName) {
  imageGetApi('/image', 'GET', null, { imageName: imageName })
  // preSingedUrl
  // imageSaveUrl
  return { imageGetData }
}
