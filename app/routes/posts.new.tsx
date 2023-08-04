import { ActionFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { ComponentPropsWithoutRef } from "react";
import { createPost } from "~/services/posts.server";

export const action: ActionFunction = async ({request}) => {
    const data = await request.formData()
    const title = data.get('title')
    const body = data.get('body') 
    
    const post = await createPost({
        title,
        body
    }) ;

    return redirect('/?posts') 
}

export default function New(props: ComponentPropsWithoutRef<'form'>) {
    return (
        <Form method="post" className="flex flex-col gap-4">
            <div className="flex flex-col">
                <label htmlFor='title' className='text-gray-900'>
                    Title
                </label>
                <input className='p-4' type="text" name="title" placeholder="Input the title..."/>
            </div>
            <div className="mb-4 flex flex-col">
                <label htmlFor='body' className='text-gray-900'>
                    Body
                </label>
                <textarea name="body" placeholder="Write somthing amazing..."/>
            </div>
            <button type="submit" className="trasnition text-blue-700 rounded">
                Create
            </button>
        </Form>
    )
}