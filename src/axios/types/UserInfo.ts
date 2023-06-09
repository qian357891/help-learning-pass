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
  imageUrl?: any
  schoolId: number
}

export { type UserInfo }
