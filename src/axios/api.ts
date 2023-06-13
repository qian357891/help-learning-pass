import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { axiosInstance } from '.'

const axiosGet = (url: string) => {
  return axiosInstance({
    method: 'get',
    url
  })
}

const axiosPost = (url: string, data: any) => {
  return axiosInstance({
    method: 'post',
    url,
    data
  })
}

const axiosPatch = (url: string, data: any) => {
  return axiosInstance({
    method: 'patch',
    url,
    data
  })
}

const axiosDelete = (url: string) => {
  return axiosInstance({ method: 'delete', url })
}

async function axiosPostFormData<T>(
  url: string,
  formData: FormData,
  config?: AxiosRequestConfig
): Promise<T> {
  const defaultConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }

  const mergedConfig: AxiosRequestConfig = {
    ...defaultConfig,
    ...config
  }

  try {
    const response: AxiosResponse<T> = await axiosInstance.post(url, formData, mergedConfig)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message)
  }
}

export { axiosGet, axiosPost, axiosPatch, axiosDelete, axiosPostFormData }
