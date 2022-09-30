import NavBar from "../../components/login/Navbar";


import './style.css';

const Login = () => {
  return (
    <>
      {/*
      <NavBar />
  */}
<section className="vh-100">
  <div className="container py-5 h-100">
    <div className="row d-flex align-items-center justify-content-center h-100">
      <div className="col-md-8 col-lg-7 col-xl-6">
        <img src="assets/img/vespa.png"
          className="img-fluid" alt="Phone image" />
      </div>
      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
        <form>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="username">Usuario</label>
            <input type="text" id="username" className="form-control form-control-lg"  placeholder="example"/>
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="password">Password</label>
            <input type="password" id="password" className="form-control form-control-lg" placeholder="*******"/>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary btn-lg btn-block text-uppercase fw-bold">Iniciar Sesión</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
    </>
  );
};

export default Login;
