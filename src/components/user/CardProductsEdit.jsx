const CardEdit = props => {
    const { openModalEdit, product } = props;
    const { batch, expiration, id, idcount, idpetition, name, sku, quantity, newbatch, newexpiration } = props.product;
    return(
        <>
        <div className="card m-2" style={{ width: "18rem" }}>
          <div className="card-body" style={{ maxHeight: 60 }}>
            <h5 className="card-title fs-6 text-primary text-center">{name}</h5>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between flex-wrap fw-bold">
              sku: <span className="fw-normal">{sku}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between flex-wrap fw-bold">
              lote: <span className="fw-normal">{`${batch} - ${newbatch}`}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between flex-wrap fw-bold">
              Contado: <span className="fw-normal">{quantity}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between flex-wrap fw-bold">
              fecha Origen: <span className="fw-normal">{expiration}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between flex-wrap fw-bold">
              fecha Capturada: <span className="fw-normal">{newexpiration}</span>
            </li>
          </ul>
          <div className="card-body d-flex justify-content-center w-100">
            <button
              className="btn btn-success"
              style={{ width: "80%", minHeight: "3.2rem", maxHeight: "3.2rem" }}
              onClick={() => openModalEdit(product)}
            >
              Editar
            </button>
          </div>
        </div>
      </>
    )
}

export default CardEdit;