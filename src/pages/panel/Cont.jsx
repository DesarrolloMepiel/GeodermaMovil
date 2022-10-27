import { useState, useEffect } from "react";
import { Alert } from "../../functions/Alert";
// import { goScanner, scanner } from "./Camera";
import "./styles.css";

import CardProduct from "../../components/user/CardProduct";
import LoadinCards from "../../components/loading/Cards";
import ModalScan from "../../components/user/ModalScan";
import Header from "../../components/user/HeaderInfo";

const Counting = (props) => {
  const RUTA = import.meta.env.VITE_BASE_URL;
  const TOKEN = import.meta.env.VITE_TOKEN;
  const {resetCount} = props;
  const { laboratory, quantity, ubication, products, idpetition, idcount} = props.products;
  const [search, setSearch] = useState("");
  const [information, setInformation] = useState({
    laboratory: "",
    quantity: "",
    ubication: "",
  });
  const [productos, setProductos] = useState([]);
  const [lastproductos, setlastProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newData, setNewData] = useState({
    batch: "",
    date: "",
    quantity: "",
  });
  const [editID, setEditID] = useState(null);

  useEffect(() => {
    setProductos(products);
    setlastProductos(products);
    setInformation({
      laboratory: laboratory,
      quantity: quantity,
      ubication: ubication,
    });
    setLoading(false);
  }, []);

  const goScanner = () => {
    scanner();
    $("#exampleModal").modal("show");
    $("canvas").addClass("hidden");
  };

  const scanner = () => {
    Quagga.init(
      {
        inputStream: {
          constraints: {
            width: 470,
            height: 300,
            // width: 1920,
            // height: 1080,
          },
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#contenedor"),
        },
        decoder: {
          readers: ["ean_reader"],
        },
      },
      function (err) {
        if (err) {
          console.log(err);
          return;
        }
        Quagga.start();
        // console.log("Iniciado correctamente");
      }
    );

    Quagga.onDetected((data) => {
      $("#exampleModal").modal("hide");
      setSearch(data.codeResult.code);
      findsku(data.codeResult.code);
      Quagga.stop(data);
    });
  };

  const findsku = (code) => {
    setLoading(true);
    const finder = "3337872414107";
    const filter = productos.filter(({ sku }) => sku === code);
    setProductos(filter);
    setLoading(false);
  };

  const resetProducts = () => {
    setLoading(true);
    setSearch("");
    setProductos(lastproductos);
    setLoading(false);
  };

  const setItem = (e) => {
    e.preventDefault();
    setLoading(true);
    const { id, idcount, idpetition } = productos.find(
      ({ id }) => id === editID
    );
    const quantity = newData.quantity ? newData.quantity : 0;
    const arrayDate = newData.date.split('-')
    const expiration = `${arrayDate[2]}/${arrayDate[1]}/${arrayDate[0]}`
    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        Authorization: TOKEN,
      },
      body: JSON.stringify({
        idcont: idcount,
        idproduct: id,
        idpetition,
        batch: newData.batch,
        expiration,
        quantity,
      }),
    };
    fetch(`${RUTA}view/petitions/item.php`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { description, problems } = result.conflicts;

        if (problems) {
          console.log(description);
          return;
        }
        const { message } = result;
        let data = [];
        let activeSearch = false;
        if(search !== ''){
          data = message.products.filter(({ sku }) => sku === search);
          activeSearch = true;
        } else {
          data = message.products;
        }
        console.log(activeSearch, data.length, data)
        if(activeSearch){
          if(data.length === 0){
            setSearch('');
            data = message.products
          }
        }
        setProductos(data);
        setlastProductos(data);
        setInformation({
          laboratory: message.laboratory,
          quantity: message.quantity,
          ubication: message.ubication,
        });
        clearFormModal();
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((error) => console.log("error", error.message));
  };

  const openModalItem = (id, name, batch, expiration) => {
    setEditID(id);
    const arraydate = expiration.split('/');
    const date = `${arraydate[2]}-${arraydate[1]}-${arraydate[0]}`
    setNewData({...newData, batch, date});
    document.getElementById("title-capture").innerHTML = name;
    $("#captureItem").modal("show");
  };

  const clearFormModal = () => {
    setNewData({
      batch: "",
      date: "",
      quantity: "",
    });
    setEditID(null);
    $("#captureItem").modal("hide");
  };

  const finished = () => {
      const requestOptions = {
        method: "PUT",
        mode: "cors",
        headers: {
          Accept: "application/json",
          Authorization: TOKEN,
        },
        body: JSON.stringify({
          idpetition
        }),
    };

    fetch(`${RUTA}view/petitions/item.php`,requestOptions)
    .then(response => response.json())
    .then(result => {
      const { problems, description } = result.conflicts;
      if(problems){
        Alert('error',description);
        return;
      }
      const { message } = result;

      Alert('success',message)
      resetCount();
    })
    .catch(error => Alert('error', error.message))
  }
  return information.quantity ? (
    <>
      <div className="w-100 ch">
        <div className="container-info">
          <Header
            laboratory={information.laboratory}
            ubication={information.ubication}
            quantity={information.quantity}
          />
          {/* <div>
            <hr className="rounded-pill m-2 hr-info" />
            <h2 className="text-uppercase fs-4 text-center fw-bold">
              Conteo del laboratorio:
              <span className="text-primary">{information.laboratory}</span>
            </h2>
            <div className="d-flex flex-row flex-wrap justify-content-center">
              <div className="mx-5">
                <h2 className="text-uppercase fw-bold">
                  Productos Restantes:
                  <span className="text-primary">{information.quantity}</span>
                </h2>
              </div>
              <div className="mx-5">
                <h2 className="text-uppercase fw-bold">
                  Ubicación: <span className="text-primary">{information.ubication}</span>
                </h2>
              </div>
            </div>
            <hr className="rounded-pill m-2 hr-info" />
          </div> */}
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

      <ModalScan
        setItem={setItem}
        newData={newData}
        setNewData={setNewData}
        clearFormModal={clearFormModal}
        loading={loading}
      />
    </>
  ) : (
    <>
      <div className="w-100 ch">
        <div className="container-info h-100">
          <Header
            laboratory={information.laboratory}
            ubication={information.ubication}
            quantity="TERMINADO"
          />
          <h2 className="text-uppercase text-center text-success fs-2 fw-bold my-3">Conteo terminado</h2>
          <h2 className="text-center fs-4 my-2">Enviar conteo al administrador</h2>
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary text-uppercase" onClick={finished}>Cerrar Conteo</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Counting;
