

const HeaderComponent = () => {
  return (
<header>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
            <a className="navbar-brand font-weight-bold" href="#">
                <i className="fas fa-blog mr-2"></i>Offline First Concept Demo
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">News</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Login</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
  )
}

export default HeaderComponent