import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  ChevronLeftIcon,
  CommentDiscussionIcon,
  CreditCardIcon,
  HomeIcon,
  MailIcon,
  OrganizationIcon,
  PencilIcon,
  PeopleIcon,
  PersonIcon,
  PlusIcon,
  ScreenFullIcon,
  TrashIcon,
} from "@primer/octicons-react";

const Predio = () => {
  const {
    query: { predioId },
  } = useRouter();
  const [predio, setPredio] = useState([]);

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
        console.log(data.predio_by_pk);
        setPredio(data.predio_by_pk);
      };
    }
  }, [predioId]);

  return (
    <div>
      <div className="flex flex-row justify-between items-center shadow h-16">
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
              #{predio.num_predial}
            </span>
          </div>
        </div>
        <button className="transition duration-500 bg-gray-200 rounded-md p-1 pl-2 mt-3 mb-3 ml-2 mr-2 flex content-center items-center justify-center pr-2 text-xs font-base hover:bg-blue-400 hover:text-white hover:font-bold">
          Editar información
        </button>
      </div>

      {/* Información principal */}
      <section className="mt-6 ml-6">
        <form>
          <label
            for="nombrePredio"
            className="text-gray-700 text-md font-bold mb-2"
          >
            Nombre del predio:{"  "}
          </label>
          <input
            id="nombrePredio"
            type="text"
            className="shadow appereancer-none border rounded w-54"
            value={predio.nombre}
          />
        </form>
        <div>
          <button></button>
          <button></button>
        </div>
      </section>

      {/* Propietarios y Construcciones*/}
      <section className="grid grid-cols-1 grid-rows-1 mx-auto border bg-gray-100">
        <div className="border rounded m-5 w-96 mx-auto max-h-screen">
          {/* Title */}
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-md font-bold ml-4">
              <PeopleIcon size={16} className="mr-2" />
              Propietarios
            </h2>
            <button className=" transition duration-500 bg-gray-200 rounded-md p-1 m-3 flex content-center items-center justify-center pr-2 text-xs font-base hover:bg-green-400 hover:text-white hover:font-bold">
              <PlusIcon size={12} className="mr-1 ml-1" /> Añadir
            </button>
          </div>
          {/* GRID */}
          <div className="h-auto bg-gray-200 grid grid-col-1 gap-y-4 pb-4 pt-4 ">
            {/* badge */}
            <div className=" bg-white h-auto shadow rounded w-11/12 mx-auto">
              <div className="flex flex-row items-center m-2 ml-4 border-b ">
                <PersonIcon size={16} className="mr-2" />
                <p className="font-normal text-lg w-10/12 truncate">
                  Javier Andrés Collazos Gómez
                </p>
                <div className="flex flex-row">
                  <button
                    title="Editar"
                    className="transition duration-500 bg-gray-200 rounded-md p-1 mt-3 mb-3 ml-2 mr-0 flex content-center items-center justify-center pr-2 text-xs font-base hover:bg-blue-400 hover:text-white hover:font-bold"
                  >
                    <PencilIcon size={12} className="ml-1" />
                  </button>
                  <button
                    id="butEliminarPredio"
                    title="Eliminar"
                    className="transition duration-500 bg-gray-200 rounded-md p-1 mt-3 mb-3 ml-1 mr-1 flex content-center items-center justify-center pr-2 text-xs font-base hover:bg-red-400 hover:text-white hover:font-bold"
                  >
                    <TrashIcon className="ml-1" size={12} />
                  </button>
                </div>
              </div>
              <ul className="ml-4 mb-2">
                <li className="text-sm text-gray-600">
                  <HomeIcon size={13} className="mr-1" /> Manzana 17 Casa 11
                  Barrio Topacio
                </li>
                <li className="text-sm text-gray-600">
                  <CommentDiscussionIcon size={13} className="mr-1" />{" "}
                  +573017217294
                </li>
                <li className="text-sm text-gray-600">
                  <MailIcon size={13} className="mr-1" />{" "}
                  jcollazosgomez@gmail.com
                </li>
                <li className="text-sm text-gray-600 ">
                  <CreditCardIcon size={13} className="mr-1" /> CC 1234644079
                </li>
              </ul>
            </div>
          </div>
          {/* Componente */}
          {/* <div></div> */}
        </div>
        <div className="border rounded m-5 w-96 mx-auto">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-md font-bold ml-4">
              <OrganizationIcon size={16} className="mr-2" /> Construcciones
            </h2>
            <button className=" transition duration-500 bg-gray-200 rounded-md p-1 m-3 flex content-center items-center justify-center pr-2 text-xs font-base hover:bg-green-400 hover:text-white hover:font-bold">
              <PlusIcon size={12} className="mr-1 ml-1" /> Añadir
            </button>
          </div>
          <div className="h-12 bg-gray-200">Soy una construccion</div>
          {/* Componente */}
          {/* <div></div> */}
        </div>
      </section>

      {/* Terreno */}
      <section className="mt-6 ml-4">
        <h2 className="text-xl font-bold ml-4">
          <ScreenFullIcon size={24} className="mr-2" />
          Terreno
        </h2>
        <div></div>
      </section>

      <br />
      {/* <h1 className="bg-gray-200">El ID del predio es: {predioId}</h1>
      <p>{predio?.avaluo}</p>
      <p>{predio?.nombre}</p>
      <p>{predio?.num_predial}</p> */}
    </div>
  );
};

export default Predio;
