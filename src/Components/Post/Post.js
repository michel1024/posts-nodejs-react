import { useState, useEffect } from "react";
import moment from "moment";
import Modal from "../Modal/modalNewPost";
import Navigation from "../Navigation/Navigation";
import "./Post.css";

const Post = () => {
    const [posts, setPosts] = useState({ response: false, data: [] });
    const [openModal, setOpenModal] = useState(false);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [edit, setEdit] = useState(false);
    const [message, setMessage] = useState({exist: false, msg: ""});

    useEffect(() => {
        if (posts.response === false) {
            const url = "http://localhost:3001/api/posts";
            const tokenStorage = localStorage.getItem('token');

            if(tokenStorage){
                fetch(url, {
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": tokenStorage
                    }
                })
                .then(response => response.json())
                .then(result => {
                    console.log({result});
                    if(result.message){
                        setMessage({exist: true, msg: result.message})
                    }
                    setPosts({ response: true, data: result })
                    console.log({ posts });
                })
                .catch(err => console.log(err))
            }else{
                window.location.href = "/login";
            }

            
        }

    }, [posts])

    const handleClickNew = () => {
        setOpenModal(true)
        setEdit(false)
        setTitle("")
        setBody("")
    }

    const props = {
        openModal,
        setOpenModal,
        title,
        setTitle,
        body,
        setBody,
        posts,
        setPosts,
        edit,
        setEdit
    }

    return (
        <div>
            <Navigation location={"posts"} />
            <div className="container">
                <h1 style={{margin: "20px 0 40px 0"}}>Posts
                    <button onClick={handleClickNew} className="btn btn-secondary" style={{fontWeight: "bolder", marginLeft: "30px"}}>New</button>
                </h1>

                <div className="post-container">
                    {posts.data.length > 0 ? posts.data.map((post, index) => {
                        return (
                            <div key={index}  className="card border-primary mb-3 col" style={{maxWidth: "20rem", minWidth: "18rem"}}>
                                <div className="card-header">
                                    <h5>{post.Title}</h5>
                                    <button onClick={() => {
                                        setEdit(true)
                                        setOpenModal(true)
                                        setTitle(post.Title)
                                        setBody(post.Body)
                                    }} name={JSON.stringify(post)} className="btn btn-primary"><i class="bi bi-pencil-square"></i></button>
                                </div>

                                <div className="card-body">
                                    <p className="card-text">{post.Body}</p>
                                    <strong>{moment(post.Date).fromNow()}</strong>
                                </div>
                            </div>
                        )
                    }) : <p>Posts not found</p>}
                </div>
            </div>

            

            {openModal && <Modal {...props} />}
        </div>
    );
}

export default Post;