interface UserInfo {
  id: number
  phone: string
  userName: string
  password?: any
  encrPassword: string
  createTime: string
  operaTime: string
  balance: number
  gender: number
  imageUrls?: any
  schoolId: number
}

export { type UserInfo }
