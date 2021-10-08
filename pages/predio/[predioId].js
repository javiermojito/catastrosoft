import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  ChevronLeftIcon,
  HashIcon,
  IterationsIcon,
  LawIcon,
  LocationIcon,
  MilestoneIcon,
  OrganizationIcon,
  PackageDependentsIcon,
  PackageIcon,
  PencilIcon,
  PeopleIcon,
  PlusIcon,
  ScreenFullIcon,
  TableIcon,
  TagIcon,
  TrashIcon,
  XIcon,
} from "@primer/octicons-react";
import BadgePropietario from "../../components/BadgePropietario/BadgePropietario";
import BadgeConstruccion from "../../components/BadgeConstruccion/BadgeConstruccion";
import { deleteTerrenoPredio, getPredioById } from "../../lib/PredioAPI";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Modal from "react-modal";
import FormTerreno from "../../components/FormTerreno/FormTerreno";
import FormPropietario from "../../components/FormPropietario/FormPropietario";
import FormConstruccion from "../../components/FormConstruccion/FormConstruccion";

const Predio = () => {
  const {
    query: { predioId },
  } = useRouter();
  const [predio, setPredio] = useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalAddTerreno, setAddTerreno] = React.useState(false);
  const [modalAddPropietario, setAddPropietario] = React.useState(false);
  const [modalAddConstruccion, setAddConstruccion] = React.useState(false);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("id", predioId);

    const target = new URL(
      "https://meet-kit-72.hasura.app/api/rest/getPredioById"
    );
    target.search = params.toString();

    //console.log(predio);
    //console.log(predioId);
    //console.log(Boolean(predioId));
    if (predioId) {
      let req = new XMLHttpRequest();
      req.open("GET", target, true);
      req.setRequestHeader("content-type", "application/json");
      req.setRequestHeader("Hasura-Client-Name", "hasura-console");
      req.setRequestHeader(
        "x-hasura-admin-secret",
        "ITIb3q708P0KJkG0MTuP7k8pXcJd2IVInFNxoP9niRuI8uH0zgvXMdnpeFyrRGoA"
      );

      req.send();
      req.onload = () => {
        const data = JSON.parse(req.responseText);
        console.log(req);
        console.log(data.predio_by_pk);
        setPredio(data.predio_by_pk);
      };
    }
  }, [predioId]);

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
    setIsOpen(true);
  };

  const afterOpenModal = () => {};

  const closeModal = () => {
    setAddTerreno(false);
    setAddConstruccion(false);
    setAddPropietario(false);
    setIsOpen(false);
  };

  const reloadPredio = (predio) => {
    setPredio(predio);
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

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const parseMoney = (value) => {
    try {
      let numValue = Number(value);
      let dollarUS = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      return dollarUS.format(numValue);
    } catch (error) {
      console.error(error);
      return `$0`;
    }
  };

  const parseID = (id) => {
    if (id) return "#" + id.toString().padStart(5, "0");
  };

  const handleClickDeleteTerreno = () => {
    let id_predio = predio.id_predial;
    let id_terreno = predio.predio_terreno[0].terreno.id_terreno;
    console.log("--");
    console.log(id_predio);
    console.log("--");
    console.log(id_terreno);

    let MySwal = withReactContent(Swal);
    MySwal.fire({
      title: `¿Seguro que desea eliminar este Terreno?`,
      text: "Esta acción no se puede revertir.",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí, elimínalo",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTerrenoPredio(id_terreno, id_predio).then((res) => {
          if (res) {
            Swal.fire(
              "¡Terreno Eliminado!",
              "El terreno ha sido eliminado correctamente.",
              "Exito"
            );
            getPredioById(id_predio).then((res) => {
              reloadPredio(res);
            });
          } else {
            alert("ocurrio un error");
          }
        });
      }
    });
  };

  return (
    <React.Fragment>
      <div className="h-auto lg:h-screen bg-gray-100">
        <div className="flex flex-row justify-between items-center shadow h-16 bg-white border-t border-b">
          <div className="flex">
            <Link href="/">
              <a>
                <ChevronLeftIcon
                  size={24}
                  verticalAlign="middle"
                  className="ml-3 mt-1 mr-2"
                />
              </a>
            </Link>
            <div className="flex flex-row my-auto items-end ">
              <h1 className="text-2xl font-bold pr-2 pl-2">{predio?.nombre}</h1>
              <span className="text-base text-gray-600 mb-px">
                {parseID(predio.num_predial)}
              </span>
            </div>
          </div>
          <button className="transition duration-500 bg-gray-200 rounded-md p-1 pl-2 mt-3 mb-3 ml-2 mr-2 flex content-center items-center justify-center pr-2 text-xs font-base hover:bg-blue-400 hover:text-white hover:font-bold">
            Editar información
          </button>
        </div>

        {/* Información principal */}
        <section className="pt-4 pl-6 pb-6 bg-white">
          <div>
            <ul className="grid gap-y-3 grid-col-2 sm:grid-cols-1 w-2/3 md:flex gap-x-8 mt-4 ml-6 md:w-11/12">
              <li className="col-start-1 sm:col-start-1 lg:col-start-1 xl:col-start-1 md:w-1/7">
                <p className="text-sm font-medium text-gray-800">
                  <PackageIcon size={13} className="mr-1.5" />
                  Nombre del Predio
                </p>
                <p className="mt-px text-sm text-gray-600 sm:mt-0 ">
                  {predio?.nombre}
                </p>
              </li>
              <li className="col-start-1 sm:col-start-2 lg:col-start-2 xl:col-start-2 md:w-1/7">
                <p className="text-sm font-medium text-gray-800">
                  <HashIcon size={13} className="mr-1.5" />
                  Número Predial
                </p>
                <p className="mt-px text-sm text-gray-600 sm:mt-0 ">
                  {parseID(predio?.num_predial)}
                </p>
              </li>
              <li className="col-start-1 sm:col-start-2 lg:col-start-2 xl:col-start-2 md:w-1/7">
                <p className="text-sm font-medium text-gray-800">
                  <LawIcon size={13} className="mr-1.5" />
                  Avaluo
                </p>
                <p className="mt-px text-sm text-gray-600 sm:mt-0 ">
                  {parseMoney(predio?.avaluo)}
                </p>
              </li>
              <li className="col-start-1 sm:col-start-1 lg:col-start-1 xl:col-start-1 md:w-1/7">
                <p className="text-sm font-medium text-gray-800">
                  <LocationIcon size={13} className="mr-1.5" />
                  Municipio
                </p>
                <p className="mt-px text-sm text-gray-600 sm:mt-0 ">
                  {predio?.municipio?.municipio}
                </p>
              </li>
              <li className="col-start-1 sm:col-start-2 lg:col-start-2 xl:col-start-2 md:w-1/7">
                <p className="text-sm font-medium text-gray-800">
                  <MilestoneIcon size={13} className="mr-1.5" />
                  Departamento
                </p>
                <p className="mt-px text-sm text-gray-600 sm:mt-0 ">
                  {capitalize(
                    predio?.departamento?.departamento?.toLowerCase()
                  )}
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* Propietarios, Construcciones y terreno*/}
        <section className="grid block w-full gap-y-9 grid-cols-1 grid-rows-1 mx-auto border-t bg-gray-100 md:grid-cols-2 xl:grid-cols-3">
          {/* Propietarios */}
          <div className="border rounded m-5 w-96 mx-auto h-96 bg-gray-200">
            {/* Title */}
            <div className="flex flex-row justify-between items-center bg-white">
              <h2 className="text-md font-bold ml-4">
                <PeopleIcon size={16} className="mr-2 mb-px" />
                Propietarios
              </h2>
              <button
                className=" transition duration-500 bg-gray-200 rounded-md p-1 m-3 flex content-center items-center justify-center pr-2 text-xs font-base hover:bg-green-400 hover:text-white hover:font-bold"
                value="addPropietario"
                onClick={openModal}
              >
                <PlusIcon size={12} className="mr-1 ml-1" /> Añadir
              </button>
            </div>
            {/* GRID */}
            <div className="overflow-y-auto h-96 bg-gray-200 grid grid-col-1 gap-y-4 pb-4 pt-4 ">
              {predio.predio_propietario?.length >= 1 ? (
                predio.predio_propietario.map(({ propietario }) => {
                  return (
                    <BadgePropietario
                      propietario={propietario}
                      reload={reloadPredio}
                      predio={predio.id_predial}
                      key={propietario.id_propietario}
                    />
                  );
                })
              ) : (
                <p className="mx-auto text-gray-800">
                  No hay propietarios registrados en este predio.
                </p>
              )}
            </div>
          </div>
          {/* Construcciones */}
          <div className="border rounded m-5 w-96 mx-auto break-all	h-96 bg-gray-200 ">
            {/* Title */}
            <div className="flex flex-row justify-between items-center bg-white">
              <h2 className="text-md font-bold ml-4">
                <OrganizationIcon size={16} className="mr-2 mb-px" />{" "}
                Construcciones
              </h2>
              <button
                className="transition duration-500 bg-gray-200 rounded-md p-1 m-3 flex content-center items-center justify-center pr-2 text-xs font-base hover:bg-green-400 hover:text-white hover:font-bold"
                onClick={openModal}
                value="addConstruccion"
              >
                <PlusIcon size={12} className="mr-1 ml-1" /> Añadir
              </button>
            </div>
            {/* GRID */}
            <div className="overflow-y-auto h-96 bg-gray-200 grid grid-col-1 gap-y-4 pb-4 pt-4 ">
              {predio.predio_construccion?.length >= 1 ? (
                predio.predio_construccion.map(({ construccion }) => {
                  return (
                    <BadgeConstruccion
                      construccion={construccion}
                      reload={reloadPredio}
                      predio={predio.id_predial}
                      key={construccion.id_construccion}
                    />
                  );
                })
              ) : (
                <p className="mx-auto text-gray-800">
                  No hay construcciones registradas en este predio.
                </p>
              )}
            </div>
            {/* Componente */}
            {/* <div></div> */}
          </div>

          {/* Terreno */}
          <div className="border rounded m-5 w-96 mx-auto h-96 bg-white md:col-span-2 xl:col-start-3">
            {/* Title */}
            <div className="flex flex-row justify-between items-center bg-white border-b">
              <h2 className="text-md font-bold ml-4">
                <ScreenFullIcon size={16} className="mr-2 mb-px" /> Terreno
              </h2>
              {predio.predio_terreno?.length >= 1 ? (
                <div className="flex flex-row mr-2">
                  <button className="transition duration-500 bg-gray-200 rounded-md p-1 pl-2 mt-3 mb-3 ml-2 mr-2 flex content-center items-center justify-center pr-2 text-xs font-base hover:bg-blue-400 hover:text-white hover:font-bold">
                    <PencilIcon size={12} className="ml-px mr-1" />
                    Editar
                  </button>
                  <button
                    className="transition duration-500 bg-gray-200 rounded-md p-1 pl-2 mt-3 mb-3 ml-2 mr-2 flex content-center items-center justify-center pr-2 text-xs font-base hover:bg-red-400 hover:text-white hover:font-bold"
                    onClick={handleClickDeleteTerreno}
                  >
                    <TrashIcon size={12} className="ml-px mr-1" />
                    Eliminar
                  </button>
                </div>
              ) : (
                <button
                  className=" transition duration-500 bg-gray-200 rounded-md p-1 m-3 flex content-center items-center justify-center pr-2 text-xs font-base hover:bg-green-400 hover:text-white hover:font-bold"
                  value="addTerreno"
                  onClick={openModal}
                >
                  <PlusIcon size={12} className="mr-1 ml-1" /> Añadir
                </button>
              )}
            </div>
            {/* GRID */}
            <div className="h-auto grid grid-col-1 gap-y-4 pb-4 pt-4 bg-white">
              {predio.predio_terreno?.length >= 1 ? (
                predio.predio_terreno.map(({ terreno }) => {
                  return (
                    <React.Fragment>
                      <ul className="ml-4">
                        <li className="col-start-1 sm:col-start-1">
                          <p className="text-sm font-medium text-gray-800 font-semibold">
                            <TableIcon size={13} className="mr-1.5" />
                            Area
                          </p>
                          <p className="mt-px text-sm text-gray-600 mb-3 ">
                            Área de {terreno.area} km²
                          </p>
                        </li>
                        <li className="col-start-1 sm:col-start-2 ">
                          <p className="text-sm font-medium text-gray-800 font-semibold">
                            <TagIcon size={13} className="mr-1.5" />
                            Valor Comercial
                          </p>
                          <p className="mt-px text-sm text-gray-600 mb-3 ">
                            {parseMoney(terreno?.valor_comercial)}
                          </p>
                        </li>
                        <li className="col-start-1 sm:col-start-1 ">
                          <p className="text-sm font-medium text-gray-800 font-semibold">
                            <IterationsIcon size={13} className="mr-1.5" />
                            Cercanía a fuentes de agua
                          </p>
                          <p className="mt-px text-sm text-gray-600 mb-3 ">
                            {terreno?.esta_cerca_fuentes_agua
                              ? `Este terreno se encuentra cerca a fuentes de agua`
                              : `Este terreno no se encuentra cerca a fuentes de agua`}
                          </p>
                        </li>
                        <li className="col-start-1 sm:col-start-2 ">
                          <p className="text-sm font-medium text-gray-800 font-semibold">
                            <MilestoneIcon size={13} className="mr-1.5" />
                            Tipo de terreno
                          </p>
                          <p className="mt-px text-sm text-gray-600 mb-3 ">
                            Terreno de tipo{" "}
                            {capitalize(
                              terreno?.tipo_terreno?.desc_tipo_terreno?.toLowerCase()
                            )}
                          </p>
                        </li>
                        <li className="col-start-1">
                          <p className="text-sm font-medium text-gray-800 font-semibold">
                            <PackageDependentsIcon
                              size={13}
                              className="mr-1.5"
                            />
                            Construcciones
                          </p>
                          <p className="mt-1 text-sm text-gray-600 mb-3 sm:col-span-2">
                            {terreno?.tiene_construcciones
                              ? `Este terreno cuenta con construcciones`
                              : `Este terreno no cuenta con construcciones`}
                          </p>
                        </li>
                      </ul>
                    </React.Fragment>
                  );
                })
              ) : (
                <span className="mx-auto">
                  No hay terreno registrado en este predio.
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Modal Añadir Terreno */}
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
            {modalAddTerreno && (
              <FormTerreno
                add={modalAddTerreno}
                predio={predio.id_predial}
                reload={reloadPredio}
                close={closeModal}
              />
            )}
            {modalAddConstruccion && (
              <FormConstruccion
                add={modalAddConstruccion}
                predio={predio.id_predial}
                reload={reloadPredio}
                close={closeModal}
              />
            )}
            {modalAddPropietario && (
              <FormPropietario
                add={modalAddPropietario}
                predio={predio.id_predial}
                reload={reloadPredio}
                close={closeModal}
              />
            )}
          </div>
        </Modal>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Predio;
