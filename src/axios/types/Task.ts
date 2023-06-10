interface TaskList {
  id: number
  taskPrice: number
  userId: number
  categoryId: number
  taskName: string
  taskInfo: string
  createTime: string
  expirationTime: string
  validSeconds: number
}

interface TaskInfo {
  id: number
  userId: number
  categoryId: number
  statusId: number
  taskName: string
  fromPlace: string
  toPlace: string
  taskInfo: string
  taskPrice: number
  originalPrice: number
  expirationTime: string
  valid: number
  contactWay: string
  contactType: string
  imageUrls: any[]
  createTime: string
  operaTime: string
  statusName: string
}

export { type TaskList, type TaskInfo }
