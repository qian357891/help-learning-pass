interface PostPreInfo {
  userId: number
  id: number
  userName: string
  headerUrl?: any
  title: string
  content: string
  createTime: string
  likeCount: number
  commentCount: number
  favoriteCount: number
  imagesUrls: any[]
}

interface PostingDetail {
  id: number
  userId: number
  userName: string
  headerUrl?: any
  title: string
  content: string
  createTime: string
  imageUrls: any[]
  likeCount: number
  favoriteCount: number
  comments: Comment[]
}

interface Comment {
  id: number
  userId: number
  communityId: number
  content: string
  parentId: number
  createTime: string
  operaTime: string
  valid: number
  children: Comment[]
}

export { type PostPreInfo, type PostingDetail, type Comment }
