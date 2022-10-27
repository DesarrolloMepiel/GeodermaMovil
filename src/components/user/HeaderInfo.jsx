const Header = props => {
    const {laboratory, quantity, ubication} = props
    return (
        <div>
        <hr className="rounded-pill m-2 hr-info" />
        <h2 className="text-uppercase fs-4 text-center fw-bold">
          Conteo del laboratorio: <span className="text-primary">{laboratory}</span>
        </h2>
        <div className="d-flex flex-row flex-wrap justify-content-center">
          <div className="mx-5">
            <h2 className="text-uppercase fw-bold">
              Productos Restantes: <span className="text-primary">{quantity}</span>
            </h2>
          </div>
          <div className="mx-5">
            <h2 className="text-uppercase fw-bold">
              Ubicación: <span className="text-primary">{ubication}</span>
            </h2>
          </div>
        </div>
        <hr className="rounded-pill m-2 hr-info" />
      </div>
    )
}

export default Header;