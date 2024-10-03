import { useLocation, useParams } from "react-router-dom"
export default function Posts() {
    const { id } = useParams();
    const urlString = new URLSearchParams(useLocation().search)
    const fname = urlString.get('fname')
    const lname = urlString.get('lname')
    return (
        <h1>Post {fname} {lname} {id}</h1>
    )
}