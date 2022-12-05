import { Input } from "react-rainbow-components";

const ModalScan = props => {
  const { setItem, newData, setNewData, clearFormModal, loading, setBatchMatch, setDateMatch, batchMatch, dateMatch } = props;
  const inputStyles = {
    width: 300,
  };
  

  return (
    <>
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
                Buscar codigo de barras
              </h5>
            </div>
            <div className="modal-body">
              <div id="contenedor"></div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                cerrar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="captureItem"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Capturar Producto
              </h5>
            </div>
            <div className="modal-body p-0 d-flex flex-column justify-content-center">
              <h2 id='title-capture' className="text-center fs-5 my-2 text-primary">PRODUCTO</h2> 
              <div>
                <form onSubmit={setItem}>

                  <Input
                    label="Lote"
                    placeholder="Lote"
                    type="text"
                    className={batchMatch ? "rainbow-p-around_medium pb-0" : "rainbow-p-around_medium pb-2"}
                    value={newData.batch}
                    onChange={e => setNewData({...newData, batch: e.target.value})}
                    style={inputStyles}
                    readOnly={batchMatch}
                    required
                  />

                  <Input
                    label="Es diferente "
                    placeholder="Lote"
                    type="checkbox"
                    className={batchMatch ? "rainbow-p-around_medium p-0 mx-3" : "rainbow-p-around_medium p-0 mx-4" }
                    checked={!batchMatch}
                    onClick={() => setBatchMatch(!batchMatch)}
                    required
                  />

                  <Input
                    label="Fecha de vencimiento"
                    type="date"
                    className={dateMatch ? "rainbow-p-around_medium pb-0" : "rainbow-p-around_medium pb-2"}
                    value={newData.date}
                    onChange={e => setNewData({...newData, date: e.target.value})}
                    style={inputStyles}
                    readOnly={dateMatch}
                    required
                  />

                  <Input
                    label="Es diferente "
                    placeholder="Lote"
                    type="checkbox"
                    className={dateMatch ? "rainbow-p-around_medium p-0 mx-3" : "rainbow-p-around_medium p-0 mx-4" }
                    checked={!dateMatch}
                    onClick={() => setDateMatch(!dateMatch)}
                    required
                  />

                  <Input
                    label="Cantidad"
                    placeholder="0"
                    type="number"
                    className="rainbow-p-around_medium"
                    value={newData.quantity}
                    onChange={e => setNewData({...newData, quantity: e.target.value})}
                    style={inputStyles}
                  />
                  <div className="d-flex justify-content-center p-2">
                    <button className="btn btn-success text-uppercase"
                    disabled={loading}>{loading ? (
                      <>
                        <span
                          className="spinner-grow spinner-grow-sm mx-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Capturando
                      </>
                    ) : (
                      "Capturar"
                      )}</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger text-uppercase"
                onClick={clearFormModal}
              >
                cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalScan;
