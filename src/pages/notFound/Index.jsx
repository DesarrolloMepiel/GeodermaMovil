import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <img
            src="assets/img/logo_mepiel.png"
            className="img-fluid"
            alt="Phone image"
            width={200}
          />
          <h1 className="display-1 fw-bold">404</h1>
          <p className="fs-3">
            <span className="text-primary fw-bold">Opps!</span> Página no
            encontrada.
          </p>
          <p className="lead">La página que buscas no existe.</p>
          <button
            className="btn btn-primary text-uppercase"
            onClick={() => navigate("/")}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
