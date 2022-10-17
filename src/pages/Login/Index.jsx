import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { VerifySession } from '../../security/Index';

import { Alert } from "../../functions/Alert";

import { HiEye, HiEyeOff, HiKey, HiUser } from "react-icons/hi";

import "./style.css";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() =>{
    const isSession = VerifySession();
    if(isSession) navigate('/panel/petition');
  },[])


  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const TOKEN = import.meta.env.VITE_TOKEN;
  
  const [inValidation, setInValidation] = useState(false);
  const [viewPass, setViewPass] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const Session = async(e) => {
    e.preventDefault();
    setInValidation(true);
  
    let requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Authorization': TOKEN
        },
        body: JSON.stringify({username: user.username, password: user.password}),
    };

    fetch(`${BASE_URL}view/login/session.php`,requestOptions)
    .then(response => response.json())
    .then(result => {
      const { description, problems } = result.conflicts;
      if(problems){
        setInValidation(false);
        Alert('error', description)
        return;
      }
      const { user } = result;
      localStorage.setItem('user', JSON.stringify(user));
      setInValidation(false);
      navigate('/panel/petition');
    })
    .catch(err => {
      console.log(err.message);
      Alert('error',err.message);
      setInValidation(false);
    })
  };

  return (
    <>
      <section className="vh-80">
        <div className="container h-100">
          <div className="row d-flex align-items-center justify-content-center shadow bg-light p-5 movil-view" style={{height: 'auto', marginTop: '150px'}}>
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="/assets/img/vespa.png"
                className="img-fluid"
                alt="Phone image"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 movil-view-form" >
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
                    autoComplete="on"
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
                        <span
                          className="spinner-grow spinner-grow-sm"
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
