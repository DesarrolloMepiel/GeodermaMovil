import { useState, useEffect } from "react";
import { Alert } from "../../functions/Alert";
// import { goScanner, scanner } from "./Camera";
import "./styles.css";

import ModalScan from "../../components/user/ModalScan";
import ModalEdit from "../../components/user/ModalEdit";
import Header from "../../components/user/HeaderInfo";

import Picking from './Picking';
import Edit from './EditPicking';
import Finished from '../../components/user/FinishedCount';

const Counting = (props) => {
  const RUTA = import.meta.env.VITE_BASE_URL;
  const TOKEN = import.meta.env.VITE_TOKEN;
  const {resetCount} = props;
  const { laboratory, quantity, ubication, products, idpetition, idcount, propertie, warehouse} = props.products;

  const [option, setOption] = useState("count");
  const [search, setSearch] = useState("");
  const [sku, setSku] = useState('');
  const [information, setInformation] = useState({
    laboratory: "",
    quantity: "",
    ubication: "",
    propertie:"",
  });
  const [productos, setProductos] = useState([]);
  const [lastproductos, setlastProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newData, setNewData] = useState({
    batch: "",
    date: "",
    quantity: 0,
  });
  const [newDataEdit, setNewDataEdit] = useState({
    newquantity: 0, 
    date: ''
  });
  const [editID, setEditID] = useState(null);
  const [ batchMatch, setBatchMatch ] = useState(true)
  const [ dateMatch, setDateMatch ] = useState(true)
  const [productsEdit, setProductEdit] = useState([]);

  useEffect(() => {
    setProductos(products);
    setlastProductos(products);
    setInformation({
      laboratory: laboratory,
      quantity: quantity,
      ubication: ubication,
      propertie: propertie,
      warehouse: warehouse,
    });
    setLoading(false);
  }, []);

  const goScanner = () => {
    scanner();
    $("#exampleModal").modal("show");
    $("canvas").addClass("hidden");
  };

  const getItemsEdit = () => {
    const requestOptions = {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        Authorization: TOKEN,
      },
    };
    fetch(
      `${RUTA}view/petitions/item.php?petition=${idpetition}&count=${idcount}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const { problems, description } = result.conflicts;
        if (problems) {
          Alert("error", description);
          return;
        }
        const { message } = result;
        // console.log(message);
        setProductEdit(message.products);
      })
      .catch((error) => Alert("error", error.message));
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
      const code = data.codeResult.code[0] === 0 ? data.codeResult.code.slice(1, -1) : data.codeResult.code;
      const lastCode = code.substring(code.length - 4);
      setSearch(lastCode);
      findsku(lastCode);
      Quagga.stop(data);
    });
  };

  const findsku = (code) => {
    setLoading(true);
    // const finder = "3337872414107";
    const filter = productos.filter(({ sku }) => sku.substring(sku.length - 4) === code);
    filter.length > 0 ? setProductos(filter) : setSearch('Sin Resultados');
    setLoading(false);
  };

  const resetProducts = () => {
    setLoading(true);
    setSearch("");
    setSku('');
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
        batch: newData.batch.toUpperCase(),
        expiration,
        quantity,
      }),
    };
    fetch(`${RUTA}view/petitions/item.php`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { description, problems } = result.conflicts;

        if (problems) {
          Alert('error',description);
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
        // console.log(activeSearch, data.length, data)
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
          warehouse: message.warehouse,
          propertie: message.propertie,
        });
        clearFormModal();
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((error) => console.log("error", error.message));
  };

  const updateQuantityItems = (e) => {
    e.preventDefault();
    setLoading(true);
    const requestOptions = {
      method: "PUT",
      mode: "cors",
      headers: {
        Accept: "application/json",
        Authorization: TOKEN,
      },
      body: JSON.stringify({
        id: newDataEdit.id,
        quantity: newDataEdit.newquantity,
      }),
    };
    
    fetch(`${RUTA}view/petitions/edititem.php`,requestOptions)
    .then(response => response.json())
    .then(result => {
      const { problems, description } = result.conflicts
      if(problems){
        Alert('error', description)
        setLoading(false);
        return;
      }

      const { message } = result
      Alert('success', message)
      getItemsEdit();
      closeModalEdit();
      setLoading(false);
    })
    .catch(error => Alert('error',error.message))
  }

  const openModalItem = (id, name, batch, expiration) => {
    setEditID(id);
    const arraydate = expiration.split('/');
    const date = `${arraydate[2]}-${arraydate[1]}-${arraydate[0]}`
    setNewData({...newData, batch, date});
    document.getElementById("title-capture").innerHTML = name;
    $("#captureItem").modal("show");
  };

  const openModalEdit = (data) => {
    document.getElementById("title-capture-edit").innerHTML = data.name;
    const arraydate = data.expiration.split('/');
    const date = `${arraydate[2]}-${arraydate[1]}-${arraydate[0]}`
    setNewDataEdit({...data, newquantity: 0, date});
    // console.table({...data, newquantity: 0, date});
    $('#editItem').modal('show');
  };

  const closeModalEdit = () => {
    $('#editItem').modal('hide');
  }

  const clearFormModal = () => {
    setNewData({
      batch: "",
      date: "",
      quantity: "",
    });
    setEditID(null);
    $("#captureItem").modal("hide");
    setBatchMatch(true);
    setDateMatch(true);
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
          idpetition,
          idcount
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
      <div className="d-flex flex-row justify-content-center">
        <div className="mx-2">
          <a className={option === 'count' ? "text-uppercase text-white bg-primary p-1 fw-bold" : "text-uppercase p-1 fw-bold"} onClick={() => setOption('count')}>Conteo</a>
        </div>
        <div className="mx-2">
          <a className={option === 'edit' ? "text-uppercase text-white bg-primary p-1 fw-bold" : "text-uppercase p-1 fw-bold"} onClick={() => setOption('edit')}>Editar</a>
        </div>
      </div>
      <Header
        laboratory={information.laboratory}
        ubication={information.ubication}
        quantity={information.quantity}
        propertie={information.propertie}
        warehouse={information.warehouse}
      />
      {option === "count" ? 
              <Picking 
                productos={productos} 
                search={search} 
                setSearch={setSearch} 
                sku={sku}
                setSku={setSku}
                findsku={findsku}
                resetProducts={resetProducts} 
                goScanner={goScanner} 
                openModalItem={openModalItem} 
                loading={loading} 
              />
            :
            <Edit 
              productsEdit={productsEdit} 
              openModalEdit={openModalEdit} 
              closeModalEdit={closeModalEdit} 
              getItemsEdit={getItemsEdit} 
            />
    }

      <ModalScan
        setItem={setItem}
        newData={newData}
        setNewData={setNewData}
        clearFormModal={clearFormModal}
        loading={loading}
        setBatchMatch={setBatchMatch}
        setDateMatch={setDateMatch}
        batchMatch={batchMatch}
        dateMatch={dateMatch}
      />

      <ModalEdit 
        closeModalEdit={closeModalEdit}
        newDataEdit={newDataEdit}
        setNewDataEdit={setNewDataEdit}
        loading={loading}
        updateQuantityItems={updateQuantityItems}
      />
    </>
  ) : (
    <>
      <div className="d-flex flex-row justify-content-center">
        <div className="mx-2">
          <a className={option === 'count' ? "text-uppercase text-white bg-primary p-1 fw-bold" : "text-uppercase p-1 fw-bold"} onClick={() => setOption('count')}>Conteo</a>
        </div>
        <div className="mx-2">
          <a className={option === 'edit' ? "text-uppercase text-white bg-primary p-1 fw-bold" : "text-uppercase p-1 fw-bold"} onClick={() => setOption('edit')}>Editar</a>
        </div>
      </div>
      <div className="w-100 ch">
        <div className="container-info h-100">
          <Header
            laboratory={information.laboratory}
            ubication={information.ubication}
            quantity="TERMINADO"
          />
          {option === 'count' ? 
            <Finished finished={finished} />
          : 
            <Edit 
              productsEdit={productsEdit} 
              openModalEdit={openModalEdit} 
              closeModalEdit={closeModalEdit} 
              getItemsEdit={getItemsEdit} 
            />
          }
        </div>
      </div>

      

      <ModalEdit 
        closeModalEdit={closeModalEdit}
        newDataEdit={newDataEdit}
        setNewDataEdit={setNewDataEdit}
        loading={loading}
        updateQuantityItems={updateQuantityItems}
      />
    </>
  );
};

export default Counting;
