import { useState } from "react";

import Swal from "sweetalert2";
import { HiEye, HiEyeOff, HiKey, HiUser } from "react-icons/hi";

import "./style.css";

const Login = () => {
  const [inValidation, setInValidation] = useState(false);
  const [viewPass, setViewPass] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const Session = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Error!",
      text: "Do you want to continue",
      icon: "error",
      confirmButtonText: "Cool",
    });

    setInValidation(true);
  };

  return (
    <>
      <section className="vh-100 bg-light">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center shadow bg-light" style={{height: '60%', marginTop: '150px'}}>
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="assets/img/vespa.png"
                className="img-fluid"
                alt="Phone image"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1" >
              <form onSubmit={Session}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-fill"
                    id="username"
                    placeholder="name@example.com"
                    value={user.username}
                    onChange={e => setUser({...user, username: e.target.value})}
                    required
                  />
                  <label htmlFor="username">Nombre de usuario<HiUser/></label>
                </div>
                <div className="form-floating mb-4">
                                    
                  <input
                    type={viewPass ? "text" : "password"}
                    className="form-control"
                    id="password"
                    placeholder="*****"
                    value={user.password}
                    onChange={e => setUser({...user, password: e.target.value})}
                    required
                  />
                  <a className="mx-2 viewPass" onClick={() => setViewPass(!viewPass) }><span>{viewPass ? <>ocultar contraseña <HiEye/> </>: <>ver contraseña <HiEyeOff/></>}</span></a>
                  <label htmlFor="password">Contraseña <HiKey/> </label>
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block text-uppercase"
                    disabled={inValidation}
                  >
                    {inValidation ? (
                      <>
                        {" "}
                        <span
                          class="spinner-grow spinner-grow-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        {"  "}Validando...
                      </>
                    ) : (
                      "Iniciar Sesión"
                    )}
                  </button>
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
