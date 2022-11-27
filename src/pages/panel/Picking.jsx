import CardProduct from "../../components/user/CardProduct";
import LoadinCards from "../../components/loading/Cards";

const Picking = props => {
    const { productos, search, resetProducts, goScanner, openModalItem, loading } = props;

    return(
        <>
        <div className="w-100 ch">
              <div className="container-info">
                <div className="d-flex flex-row flex-nowrap justify-content-center w-100 p-3">
                  <input
                    type="text"
                    className="border border-end-0 rounded-start"
                    placeholder="Busca el sku"
                    value={search}
                    readOnly
                  />
                  <button
                    className={`${
                      search ? "bg-warning" : "bg-primary"
                    } text-white text-uppercase fs-6 btn-primary border border-start-0 rounded-end`}
                    onClick={() => (search ? resetProducts() : goScanner())}
                  >
                    {search ? "Restablecer" : "Buscar"}
                  </button>
                </div>
                <div className="d-flex flex-row flex-wrap justify-content-center">
                  {loading ? (
                    <>
                      <LoadinCards />
                    </>
                  ) : (
                    productos.map((product) => (
                      <CardProduct
                        key={product.id}
                        product={product}
                        openModalItem={openModalItem}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
        </>
    )
}

export default Picking;