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

export { type TaskList }
