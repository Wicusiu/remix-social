import type { LoaderFunction} from "@remix-run/node"
import { Outlet } from "@remix-run/react"

export default function Posts() {
    return (
        <div style={{fontFamily: 'system-ui, sans-serif',}}>
            <h1>Posts...</h1>
            <Outlet />
        </div>
    )
}