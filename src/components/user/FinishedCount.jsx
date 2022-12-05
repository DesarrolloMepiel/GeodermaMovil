const Finished = props => {
    const { finished } = props;
  return (
    <>
      <h2 className="text-uppercase text-center text-success fs-2 fw-bold my-3">
        Conteo terminado
      </h2>
      <h2 className="text-center fs-4 my-2">Enviar conteo al administrador</h2>
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary text-uppercase" onClick={finished}>
          Cerrar Conteo
        </button>
      </div>
    </>
  );
};

export default Finished;
