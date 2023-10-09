import { Link, redirect } from "react-router-dom";

const Navigation = ({location, token, setToken}) => {

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = "/login"
    }

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Navbar</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarColor01">
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item">
                                    <Link to={"/posts"} className={location == "posts" ? "nav-link active" : "nav-link"}>Posts</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">About</a>
                                </li>
                                <li className="nav-item" style={{position: "absolute", right: "50px", lineHeight: "3.2"}}>
                                    <button type="button" className="btn btn-warning" onClick={handleLogout}>Logout</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default Navigation;