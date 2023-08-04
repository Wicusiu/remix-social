import { ActionFunction, json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { ComponentPropsWithoutRef } from "react";
import { Button } from "~/components/Button";
import { createPost } from "~/services/posts.server";
import { CreatePost } from "~/services/validations";

type ActionData = {
    error: {
      formError?: string[]
      fieldErrors?: {
        title?: string[]
        body?: string[]
      }
    }
    fields: {
      title?: string
      body?: string
    }
  }
  
  export const action: ActionFunction = async ({request}) => {
    const form = await request.formData()
    const rawTitle = form.get('title')
    const rawBody = form.get('body')
    const result = CreatePost.safeParse({title: rawTitle, body: rawBody})
  
    if (!result.success) {
      return json(
        {
          error: result.error.flatten(),
          fields: {
            title: rawTitle,
            body: rawBody,
          },
        },
        {status: 400},
      )
    }
  
    await createPost({
      title: result.data.title ?? null,
      body: result.data.body,
      authorId: 'bad-id',
    })
  
    return redirect('/')
  }

export type Props = ComponentPropsWithoutRef<'form'> & {
    error?: {
      formError?: string[]
      fieldErrors?: {
        title?: string[]
        body?: string[]
      }
    }
    fields?: {
      title?: string
      body?: string
    }
}

export default function New({error, fields, method = 'post', ...props}: Props) {
    return (
      <div className="m-4 flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold underline">Create a new Post</h1>
        <Form method="post" className="flex flex-col gap-4">
            <div className="flex flex-col">
                <label htmlFor="title" className="mb-2 text-gray-600">
                Title
                </label>
                <input
                defaultValue={fields?.title}
                className="p-4"
                name="title"
                placeholder="Title of your post"
                />
                {error?.fieldErrors?.title && (
                <p className="text-red-500">{error.fieldErrors.title}</p>
                )}
            </div>
            <div className="mb-4 flex flex-col">
                <label htmlFor="body" className="mb-2 text-gray-600">
                Body
                </label>
                <textarea
                defaultValue={fields?.body}
                className="p-4"
                name="body"
                placeholder="Write something amazing"
                />
                {error?.fieldErrors?.body && (
                <p className="text-red-500">{error.fieldErrors.body}</p>
                )}
            </div>
            {error?.formError && <p className="text-red-500">{error.formError}</p>}
            <Button type="submit">Create Post</Button>
        </Form>
      </div>
    )
}