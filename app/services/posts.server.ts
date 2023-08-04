import { Post } from '@prisma/client'
import { db } from '~/services/db.server'

export type{Post} from '@prisma/client' 

export const getPosts = () => {
    return db.post.findMany()
}

export type CreatePostArgs = Pick<Post, 'title' | 'body' | 'authorId'>

export const createPost = ({
    title,
    body,
    authorId,
  } : CreatePostArgs) => {
    return db.post.create({data: {title, body, authorId}})
  }