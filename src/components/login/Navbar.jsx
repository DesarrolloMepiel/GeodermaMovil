const NavBar = () => {
    return(
        <nav className="navbar bg-gray-400 p-0">
        <div className="d-flex flex-row w-100 justify-content-between flex-wrap align-items-inherit">
          <a className="navbar-brand" href="#">
            <img
              className="mx-3"
              src="assets/img/logo_mepiel.png"
              alt="MEPIEL"
              width="150"
            />
          </a>
          <a className="navbar-brand" href="#">
            <img
              className="mx-3"
              src="assets/img/vespa.png"
              alt="Vespa MEPIEL"
              width="200"
            />
          </a>
        </div>
      </nav>
    )
}

export default NavBar;