import { json, type LoaderFunction} from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"

import { getPosts } from "~/services/posts.server"
import type { Post } from "~/services/posts.server"

import {Post as PostComponent} from '~/components/Post' ;

type LoaderData = {
    posts: Post[]
}

export const loader:LoaderFunction = async () => {
    const data: LoaderData = {posts: await getPosts()} 
    return json(data);
}

export default function Index() {
    const { posts } = useLoaderData<LoaderData>()
    return (
        <>
        <h2>News</h2>
        <ul>
            {posts.map(post => {
                return <li key={post.id}>
                    <PostComponent header={post.title}>
                        {post.body}
                    </PostComponent>
                </li>
            })}
        </ul>
        <Link to={'new'}>Create an new one</Link>
        </>
    )
}