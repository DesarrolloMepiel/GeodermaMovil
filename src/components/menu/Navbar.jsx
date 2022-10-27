const Nav = (props) => {
  const {user, DestroySession, navigate} = props;
  const {name} = user;
  const logOut = () => {
    const isDestroy = DestroySession();
    if (isDestroy) {
      navigate('/')
      return;
    }
  };
  
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand text-uppercase fs-6 fw-bold">
            <img src="/assets/img/banner.png"  alt="vespa" width={300}/>
          </a>
          <div id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>

            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="nav-link navbar-brand text-lowercase fs-2"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {name}
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png" width={35} alt="" />
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" onClick={logOut}>
                      Salir
                    </a>
                  </li>
                </ul>
              </li>
              {/* <li className="nav-item">
                <button className="btn btn-danger" onClick={logOut}>Salir</button>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
