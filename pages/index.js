import React, { useState, useEffect } from "react";
import { PackageIcon, PlusIcon, XIcon } from "@primer/octicons-react";
import BadgePredio from "../components/BadgePredio/BadgePredio";
import Footer from "../components/Footer/Footer";
import Modal from "react-modal";
import FormPredio from "../components/FormPredio/FormPredio";

const Home = () => {
  const [predioList, setPredioList] = useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalAddPredio, setAddPredio] = React.useState(false);

  useEffect(() => {
    window
      .fetch(`https://meet-kit-72.hasura.app/api/rest/getPredios`, {
        method: "GET",
        mode: "cors",
        headers: {
          "content-type": "application/json",
          "Hasura-Client-Name": "hasura-console",
          "x-hasura-admin-secret":
            "ITIb3q708P0KJkG0MTuP7k8pXcJd2IVInFNxoP9niRuI8uH0zgvXMdnpeFyrRGoA",
        },
      })
      .then((res) => res.json())
      .then(({ predio }) => {
        setPredioList(predio);
      });
  }, []);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const openModal = (e) => {
    let value = getValueFromEvent(e);
    if (value === "addTerreno") setAddTerreno(true);
    if (value === "addConstruccion") setAddConstruccion(true);
    if (value === "addPropietario") setAddPropietario(true);
    if (value === "addPredio") setAddPropietario(true);
    setIsOpen(true);
  };

  const afterOpenModal = () => {};

  const closeModal = () => {
    setAddPredio(false);
    setIsOpen(false);
  };

  const getValueFromEvent = (e) => {
    let value;
    if (e.target.nodeName === "path") {
      value = e.target.parentElement.parentElement.value;
    } else if (e.target.nodeName === "svg") {
      value = e.target.parentElement.value;
    } else {
      value = e.target.value;
    }
    return value;
  };

  const reloadPredioList = (predioList) => {
    setPredioList(predioList);
  };

  return (
    <React.Fragment>
      <div className="h-full md:h-screen">
        <main className="pt-7 pl-7 pb-7 flex">
          <h1 className="text-4xl flex items-center font-bold">
            <PackageIcon size={28} className="mr-2" /> Predios
          </h1>
          <button
            className=" transition duration-500 bg-gray-200 rounded-md p-1 m-3 flex content-center items-center justify-center pr-2 text-xs font-base hover:bg-green-400 hover:text-white hover:font-bold"
            onClick={openModal}
          >
            <PlusIcon size={12} className="mr-1 ml-1" /> Añadir
          </button>
        </main>
        <div className="grid w-full mb-6 mx-auto grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 ">
          {predioList.map((predio) => {
            return (
              <BadgePredio
                predio={predio}
                key={predio.id_predial}
                reloadPredioList={reloadPredioList}
              />
            );
          })}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex mx-auto justify-between">
          <div> </div>
          <button onClick={closeModal} className="mr-2">
            <XIcon size={24} />
          </button>
        </div>
        <div className="mx-auto flex">
          <FormPredio
            add={modalAddPredio}
            reloadPredioList={reloadPredioList}
            close={closeModal}
          />
        </div>
      </Modal>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
