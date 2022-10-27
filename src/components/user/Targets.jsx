import { useState } from 'react';
import { ImTicket, ImSpinner9 } from "react-icons/im";
import ImageGrid from '../../components/loading/home';

const Target = (props) => {
  const { isLoadingPetition, petition, nexStep, inValidation } = props;
  const { empty,laboratory,status,ubication,warehouse } = petition;
  
  return (
    <>
      <section className="">
        <div className="container py-1 h-100">
          <div
            className="row d-flex align-items-center justify-content-center shadow bg-light p-4"
            style={{ height: "auto", marginTop: "50px" }}
          >            
              { isLoadingPetition ? <ImageGrid /> :
              empty ? 
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <hr className="w-100 mt-1 mb-3" style={styles.divider}/>
                  <h2 className="fs-2 text-uppercase fw-bold mb-3">Sin peticiones</h2>
                  <hr className="w-100 mt-1 mb-3" style={styles.divider}/>
                </div> 
              :
              <>
              <div className="col-md-8 col-lg-7 col-xl-6">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h2 className="fs-2 fw-bold text-uppercase">
                  Estado de la petición
                </h2>
                <hr className="w-100 mb-0" style={styles.divider} />
                <h2 className="fs-4 m-0 text-uppercase fw-bold">
                  PETICIÓN: 
                  <span style={{ color: status === 'activo' ? "green" : "#DC5C04"}}>
                    {status} {status === 'activo' ? <ImTicket /> : <ImSpinner9 />}
                  </span>
                </h2>
                <hr className="w-100 mt-1 mb-3" style={styles.divider} />
                <div className="p-4">
                  <h2 className="fs-4 fw-bold text-primary mb-3">
                    Laboratorio:{" "}
                    <span className="text-uppercase">{laboratory}</span>
                  </h2>
                  <h2 className="fs-4 fw-bold text-primary mb-3">
                    Almacen: <span className="text-uppercase">{warehouse}</span>
                  </h2>
                  <h2 className="fs-4 fw-bold text-primary">
                    Ubicacion: <span className="text-uppercase">{ubication}</span>
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-lg btn-block text-uppercase w-100"
                    style={{ backgroundColor: status === 'activo' ? "green" : "#DC5C04", color: 'white'}}
                    disabled={inValidation}
                    onClick={() => nexStep(petition)}
                  >
                    {inValidation ? (
                      <>
                        <span
                          className="spinner-grow spinner-grow-sm mx-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Consultando
                      </>
                    ) : (
                      status === 'activo' ? <><ImTicket /> Comenzar</> : <><ImSpinner9 /> Continuar</>
                      )}
                  </button>
                </div>
            </div>
            </>
            }
          </div>
        </div>
      </section>
    </>
  );
};

export default Target;

const styles = {
    divider: {
      height: "5px",
      backgroundColor: "#068973",
      color: "#068973",
    },
};