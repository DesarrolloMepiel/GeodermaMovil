import {goScanner, scanner} from './Camera'; 
import './styles.css';

const Counting = () => {
  return (
    <>
      <h2>Scanner</h2>
      <button onClick={() => goScanner()}>Hola</button>
      <a href="//parzibyte.me/blog">By Parzibyte</a>
      <p id="resultado">Aquí aparecerá el código</p>
      <p>A continuación, el contenedor: </p>

      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
            </div>
            <div className="modal-body">
              <div id="contenedor"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Counting;
