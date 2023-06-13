interface TaskList {
  id: number
  taskPrice: number
  originalPrice: number
  userId: number
  categoryId: number
  taskName: string
  taskInfo: string
  createTime: string
  expirationTime: string
  validSeconds: number
  imageUrls: string[]
}

interface TaskInfo {
  id: number
  userId: number
  userName: string
  headUrl?: any
  categoryId: number
  taskName: string
  fromPlace: string
  toPlace: string
  taskInfo: string
  taskPrice: number
  originalPrice: number
  expirationTime: string
  contactWay: string
  contactType: string
  imageUrls: any[]
  createTime: string
  viewCount: number
}

export { type TaskList, type TaskInfo }
