import CardProduct from "../../components/user/CardProduct";
import LoadinCards from "../../components/loading/Cards";
import { Alert } from "../../functions/Alert";

const Picking = props => {
    const { productos, search, resetProducts, goScanner, openModalItem, loading, setSearch, findsku, sku, setSku } = props;

    
    
    const searchManually = () => {
      if(!sku){
        Alert('error', 'Es necesario ingresar un sku');
        return;
      }
      setSearch(sku);
      findsku(sku);
    }
    return(
        <>
        <div className="w-100 ch">
              <div className="container-info">
                <div className="d-flex flex-row flex-nowrap justify-content-center w-100 p-3">
                  <input
                    type="text"
                    className="border border-end-0 rounded-start"
                    placeholder="Busca el sku"
                    value={sku}
                    onChange={e => setSku(e.target.value)}
                  />
                  <button
                    className={`${
                      search ? "bg-warning" : "bg-primary"
                    } text-white text-uppercase fs-6 btn-primary border border-start-0 rounded-end`}
                    onClick={() => (search ? resetProducts() : searchManually())}
                  >
                    {search ? "Restablecer" : "Buscar"}
                  </button>
                  <button
                    className={`${
                      search ? "bg-warning mx-4" : "bg-primary mx-4"
                    } text-white text-uppercase fs-6 btn-primary border border-start-0 rounded-end`}
                    onClick={() => (search ? resetProducts() : goScanner())}
                  >
                    {search ? "Restablecer" : "Escanear"}
                  </button>
                </div>
                <div className="d-flex justify-content-center">
                  <h2 className="fw-bold fs-4 m-3">{search ? search : 'General'}</h2>
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