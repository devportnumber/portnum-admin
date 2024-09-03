import { useEffect } from 'react'
import { useAxios } from '../hooks/useAxios'

// Custom Hook: getImageUrl
export function getImageUrl(imageName) {
  const {
    fetchData: imageGetApi,
    loading2: loading,
    data: imageGetData,
    error: error,
  } = useAxios()

  useEffect(() => {
    if (imageName) {
      imageGetApi('/image', 'GET', null, { imageName: imageName })
    }
  }, [imageName])

  return { imageGetData, loading, error }
}
