import { Link } from "react-router-dom";

export default function ErrorNotfound(){
    return(
        <div>
            <h1>404 Error: page Not Found</h1>

            <Link to="/" className="text-blue-500
            border-[3px] border-blue-500 m-1">Go back to home</Link>
        </div>
    )
}