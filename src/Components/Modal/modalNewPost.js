import React, {useState} from "react";
import "./Modal.css";

const modalNewPost = (props) => {
    // const [title, setTitle] = useState([]);
    // const [body, setBody] = useState([]);

    const handleClickClose = () => {
        props.setOpenModal(false);
        props.setEdit(false);
        props.setPosts({response: false, data: []})
    }

    const handleSubmit = (e) => {
        e.preventDefault();


        const data = {title: props.title, body: props.body}

        if(props.edit){
            fetch(`http://localhost:3001/api/posts/${props.edit._id}`, {
                method: "PATCH",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
            .then((result) => {
                props.setPosts({response: false, data: []})
            })
            .catch((err) => console.error(err))
        }else{
            
            fetch("http://localhost:3001/api/posts", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
            .then((result) => {
                props.setPosts({response: false, data: []})
            })
            .catch((err) => console.error(err))
        }

        
        props.setOpenModal(false);

        
    }

    return (
        <div className="main-container">
            
            <div className="modal-container">
                <div className="card">
                    <div className="card-header">
                        <h3>{props.edit ? 'Edit Post' : 'New Post'}</h3>
                    </div>

                    <form onSubmit={handleSubmit} method="POST">

                        <div className="card-body">
                            <input onChange={e => props.setTitle(e.target.value)} value={props.title} type="text" className="form-control" id="title" name="title" placeholder="Title" />
                            <textarea onChange={e => props.setBody(e.target.value)} className="form-control" id="body" name="body" placeholder="Body">{props.edit ? props.body : ""}</textarea>
                        </div>


                        <div className="card-footer">
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">Save</button>
                                <button onClick={handleClickClose} className="btn btn-secondary">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            

            
        </div>
    );
}

export default modalNewPost;