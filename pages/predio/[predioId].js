import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  ChevronLeftIcon,
  CommentDiscussionIcon,
  CreditCardIcon,
  HashIcon,
  HomeIcon,
  IterationsIcon,
  LocationIcon,
  MailIcon,
  MilestoneIcon,
  OrganizationIcon,
  PackageDependentsIcon,
  PackageIcon,
  PencilIcon,
  PeopleIcon,
  PersonIcon,
  PlusIcon,
  ScreenFullIcon,
  TableIcon,
  TagIcon,
  TrashIcon,
} from "@primer/octicons-react";
import BadgePropietario from "../../components/BadgePropietario/BadgePropietario";
import BadgeConstruccion from "../../components/BadgeConstruccion/BadgeConstruccion";

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
        console.log(req);
        console.log(data.predio_by_pk);
        setPredio(data.predio_by_pk);
      };
    }
  }, [predioId]);

  const reloadPredio = (predio) => {
    setPredio(predio);
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
                #{predio.num_predial}
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
                <p class="text-sm font-medium text-gray-800">
                  <PackageIcon size={13} className="mr-1.5" />
                  Nombre del Predio
                </p>
                <p class="mt-px text-sm text-gray-600 sm:mt-0 ">
                  {predio?.nombre}
                </p>
              </li>
              <li className="col-start-1 sm:col-start-2 lg:col-start-2 xl:col-start-2 md:w-1/7">
                <p class="text-sm font-medium text-gray-800">
                  <HashIcon size={13} className="mr-1.5" />
                  Número Predial
                </p>
                <p class="mt-px text-sm text-gray-600 sm:mt-0 ">
                  {predio?.num_predial}
                </p>
              </li>
              <li className="col-start-1 sm:col-start-1 lg:col-start-1 xl:col-start-1 md:w-1/7">
                <p class="text-sm font-medium text-gray-800">
                  <LocationIcon size={13} className="mr-1.5" />
                  Municipio
                </p>
                <p class="mt-px text-sm text-gray-600 sm:mt-0 ">
                  {predio?.municipio?.municipio}
                </p>
              </li>
              <li className="col-start-1 sm:col-start-2 lg:col-start-2 xl:col-start-2 md:w-1/7">
                <p class="text-sm font-medium text-gray-800">
                  <MilestoneIcon size={13} className="mr-1.5" />
                  Departamento
                </p>
                <p class="mt-px text-sm text-gray-600 sm:mt-0 ">
                  {capitalize(
                    predio?.departamento?.departamento?.toLowerCase()
                  )}
                </p>
              </li>
            </ul>

            {/* <ul>
            <li>Area</li>
            <li>Valor comercial</li>
            <li>Esta cerca de fuentes de agua</li>
            <li>Tipo de terreno</li>
            <li>Tiene construcciones</li>
          </ul> */}
          </div>
        </section>

        {/* Propietarios, Construcciones y terreno*/}
        <section className="grid block w-full grid-cols-1 grid-rows-1 mx-auto border-t bg-gray-100 md:grid-cols-2 xl:grid-cols-3">
          {/* Propietarios */}
          <div className="border rounded m-5 w-96 mx-auto h-96 bg-gray-200">
            {/* Title */}
            <div className="flex flex-row justify-between items-center bg-white">
              <h2 className="text-md font-bold ml-4">
                <PeopleIcon size={16} className="mr-2 mb-px" />
                Propietarios
              </h2>
              <button className=" transition duration-500 bg-gray-200 rounded-md p-1 m-3 flex content-center items-center justify-center pr-2 text-xs font-base hover:bg-green-400 hover:text-white hover:font-bold">
                <PlusIcon size={12} className="mr-1 ml-1" /> Añadir
              </button>
            </div>
            {/* GRID */}
            <div className="overflow-auto h-auto bg-gray-200 grid grid-col-1 gap-y-4 pb-4 pt-4 ">
              {predio.predio_propietario?.length >= 1 ? (
                predio.predio_propietario.map(({ propietario }) => {
                  return (
                    <BadgePropietario
                      propietario={propietario}
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
              <button className="transition duration-500 bg-gray-200 rounded-md p-1 m-3 flex content-center items-center justify-center pr-2 text-xs font-base hover:bg-green-400 hover:text-white hover:font-bold">
                <PlusIcon size={12} className="mr-1 ml-1" /> Añadir
              </button>
            </div>
            {/* GRID */}
            <div className="overflow-auto h-auto bg-gray-200 grid grid-col-1 gap-y-4 pb-4 pt-4">
              {predio.predio_construccion?.length >= 1 ? (
                predio.predio_construccion.map(({ construccion }) => {
                  return (
                    <BadgeConstruccion
                      construccion={construccion}
                      predio={predio}
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
              <button className=" transition duration-500 bg-gray-200 rounded-md p-1 m-3 flex content-center items-center justify-center pr-2 text-xs font-base hover:bg-green-400 hover:text-white hover:font-bold">
                <PlusIcon size={12} className="mr-1 ml-1" /> Añadir
              </button>
            </div>
            {/* GRID */}
            <div className="h-auto grid grid-col-1 gap-y-4 pb-4 pt-4 bg-white">
              <ul className="ml-4">
                <li className="col-start-1 sm:col-start-1">
                  <p class="text-sm font-medium text-gray-800 font-semibold">
                    <TableIcon size={13} className="mr-1.5" />
                    Area
                  </p>
                  <p class="mt-px text-sm text-gray-600 mb-3 ">
                    Área de {predio?.terreno?.area} km²
                  </p>
                </li>
                <li className="col-start-1 sm:col-start-2 ">
                  <p class="text-sm font-medium text-gray-800 font-semibold">
                    <TagIcon size={13} className="mr-1.5" />
                    Valor Comercial
                  </p>
                  <p class="mt-px text-sm text-gray-600 mb-3 ">
                    {parseMoney(predio?.terreno?.valor_comercial)}
                  </p>
                </li>
                <li className="col-start-1 sm:col-start-1 ">
                  <p class="text-sm font-medium text-gray-800 font-semibold">
                    <IterationsIcon size={13} className="mr-1.5" />
                    Cercanía a fuentes de agua
                  </p>
                  <p class="mt-px text-sm text-gray-600 mb-3 ">
                    {predio?.terreno?.esta_cerca_fuentes_agua
                      ? `Este terreno se encuentra cerca a fuentes de agua`
                      : `Este terreno no se encuentra cerca a fuentes de agua`}
                  </p>
                </li>
                <li className="col-start-1 sm:col-start-2 ">
                  <p class="text-sm font-medium text-gray-800 font-semibold">
                    <MilestoneIcon size={13} className="mr-1.5" />
                    Tipo de terreno
                  </p>
                  <p class="mt-px text-sm text-gray-600 mb-3 ">
                    Terreno de tipo{" "}
                    {capitalize(
                      predio?.terreno?.tipo_terreno?.desc_tipo_terreno?.toLowerCase()
                    )}
                  </p>
                </li>
                <li className="col-start-1">
                  <p class="text-sm font-medium text-gray-800 font-semibold">
                    <PackageDependentsIcon size={13} className="mr-1.5" />
                    Construcciones
                  </p>
                  <p class="mt-1 text-sm text-gray-600 mb-3 sm:col-span-2">
                    {predio?.terreno?.tiene_construcciones
                      ? `Este terreno cuenta con construcciones`
                      : `Este terreno no cuenta con construcciones`}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </section>
        {/* Terreno */}
        {/* <section className="mt-6 ml-4 mb-6">
        <div className="flex flex-row justify-between items-center border-b">
          <h2 className="text-xl font-bold ml-4">
            <ScreenFullIcon size={24} className="mr-2" />
            Terreno
          </h2>
          <div className="flex flex-row mr-2">
            <button className="transition duration-500 bg-gray-200 rounded-md p-1 pl-2 mt-3 mb-3 ml-2 mr-2 flex content-center items-center justify-center pr-2 text-xs font-base hover:bg-blue-400 hover:text-white hover:font-bold">
              <PencilIcon size={12} className="ml-px mr-1" />
              Editar
            </button>
            <button className="transition duration-500 bg-gray-200 rounded-md p-1 pl-2 mt-3 mb-3 ml-2 mr-2 flex content-center items-center justify-center pr-2 text-xs font-base hover:bg-red-400 hover:text-white hover:font-bold">
              <TrashIcon size={12} className="ml-px mr-1" />
              Eliminar
            </button>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center border-b">
          <h2 className="text-xl font-bold ml-4">
            <ScreenFullIcon size={24} className="mr-2" />
            Sin Terreno
          </h2>
          <div className="flex flex-row mr-2">
            <button className="transition duration-500 bg-gray-200 rounded-md p-1 pl-2 mt-3 mb-3 ml-2 mr-2 flex content-center items-center justify-center pr-2 text-xs font-base hover:bg-green-400 hover:text-white hover:font-bold">
              <PlusIcon size={12} className="ml-px mr-1" />
              Añadir
            </button>
          </div>
        </div>
      </section> */}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Predio;
