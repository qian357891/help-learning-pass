import { axiosInstance } from '@/axios'
import { axiosConfig } from '@/axios/axios.config'

const likeOrStar = async (categoryId: number, communityId: number) => {
  const data = await axiosInstance({
    method: 'post',
    url: axiosConfig.rootUrl + axiosConfig.likeOrStar,
    params: {
      categoryId,
      communityId
    }
  })
  console.log(data)
}

export { likeOrStar }
