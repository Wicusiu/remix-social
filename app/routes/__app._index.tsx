import { json, LoaderFunction, redirect, type V2_MetaFunction } from "@remix-run/node";
import { isRouteErrorResponse, Link, Outlet, useCatch, useLoaderData, useParams, useRouteError } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { getPosts } from "~/services/posts.server";

import {Post as PostComponent} from '~/components/Post' ;

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>
}

export const loader: LoaderFunction = async ({request}) => {
  await authenticator.isAuthenticated(request, {failureRedirect: '/login'})
  const data: LoaderData = {posts: await getPosts()}
  return json(data)
}

export default function Index() {
  const {posts} = useLoaderData<LoaderData>()
  return (
    <div className="m-4 flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold underline">Remix Social</h1>
      
      <ul className="w-5/6 flex flex-col gap-4">
        {posts.map((post) => {
          console.log(post) 
          return <li key={post.body}>
            <PostComponent
              header={post?.title}
              authorName={post?.author?.email}
            >
              {post.body}
            </PostComponent>
          </li>
      })}
      </ul>

      <Link to={'/new'} prefetch="intent">Create an new one</Link>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
      </div>
    );
  }

  // Don't forget to typecheck with your own logic.
  // Any value can be thrown, not just errors!
  let errorMessage = "Unknown error";
  if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div>
      <h1>Uh oh ...</h1>
      <p>Something went wrong.</p>
      <pre>{errorMessage}</pre>
    </div>
  );
}