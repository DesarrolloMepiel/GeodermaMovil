import { Input } from "react-rainbow-components";

const ModalEdit = props => {
    const { closeModalEdit, newDataEdit, loading, updateQuantityItems, setNewDataEdit } = props;

    const inputStyles = {
      width: 300,
    };
    return(
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
          id="editItem"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          data-bs-backdrop="static"
        >
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Editar Producto
                </h5>
              </div>
              <div className="modal-body p-0 d-flex flex-column justify-content-center">
                <h2 id='title-capture-edit' className="text-center fs-5 my-2 text-primary">PRODUCTO</h2> 
                <div>
                  <form onSubmit={updateQuantityItems}>
  
                    <Input
                      label="Lote"
                      placeholder="Lote"
                      type="text"
                      className="rainbow-p-around_medium pb-0"
                      value={newDataEdit.batch}
                      readOnly
                      style={inputStyles}
                      required
                    />
  

  
                    <Input
                      label="Contado"
                      type="number"
                      className="rainbow-p-around_medium pb-0"
                      value={newDataEdit.quantity}
                      readOnly
                      style={inputStyles}
                      required
                    />

                    <Input
                      label="Fecha de vencimiento"
                      type="date"
                      className={true ? "rainbow-p-around_medium pb-0" : "rainbow-p-around_medium pb-2"}
                      value={newDataEdit.date}
                      readOnly
                      style={inputStyles}
                      required
                    />
  
  
                    <Input
                      label="Nueva Cantidad"
                      placeholder="0"
                      type="number"
                      className="rainbow-p-around_medium"
                      value={newDataEdit.newquantity}
                      onChange={e => setNewDataEdit({...newDataEdit, newquantity: e.target.value})}
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
                          Editando
                        </>
                      ) : (
                        "Editar"
                        )}</button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger text-uppercase"    
                  onClick={closeModalEdit}            
                >
                  cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

export default ModalEdit;