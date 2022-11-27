import { useState, useEffect } from "react";
import { Alert } from "../../functions/Alert";

import Card from "../../components/user/CardProductsEdit";
const EditPicking = (props) => {
  const RUTA = import.meta.env.VITE_BASE_URL;
  const TOKEN = import.meta.env.VITE_TOKEN;

  const { openModalEdit, getItemsEdit, productsEdit } = props;
  

  useEffect(() => {
    getItemsEdit();
  }, []);
  

  return (
    <>
      <div className="d-flex flex-row flex-wrap justify-content-center">
        {productsEdit.map((product) => <Card key={product.id} product={product} openModalEdit={openModalEdit} />)}
      </div>

    </>
  );
};

export default EditPicking;
