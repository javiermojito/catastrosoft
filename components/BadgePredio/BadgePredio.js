import React, { Component, Fragment } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

import {
  KebabHorizontalIcon,
  LawIcon,
  LocationIcon,
  PersonIcon,
  OrganizationIcon,
  ScreenFullIcon,
  PencilIcon,
  TrashIcon,
  PeopleIcon,
} from "@primer/octicons-react";

export default class BadgePredio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.predio = {
      ...props.predio,
    };
    this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log(e);
    let value;

    if (e.target.nodeName === "path") {
      value = e.target.parentElement.parentElement.value;
    } else if (e.target.nodeName === "svg") {
      value = e.target.parentElement.value;
    } else {
      value = e.target.value;
    }

    this.callDeletePredio(value);
  }

  capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  callDeletePredio(predio) {
    MySwal.fire({
      title: `¿Seguro que desea eliminar este '${predio}'?`,
      text: "Esta acción no se puede revertir.",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí, elimínalo",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("PEDIENTE");
        Swal.fire(
          "Predio Eliminado!",
          "El predio ha sido eliminado correctamente.",
          "Exito"
        );
      }
    });
  }

  // <Link href={`/predio/${this.predio.id_predial}`}>
  render() {
    return (
      <div className="h-24 w-96 mx-auto h-full cursor-pointer transition hover:shadow-md">
        <div className="flex flex-row justify-between	content-center text-center border-t border-l border-r rounded-t-lg w-full shadow">
          <Link href={`/predio/${this.predio.id_predial}`}>
            <div className="flex flex-row my-auto items-end pt-2 pl-2 pb-2 w-full border-r">
              <h2 className="text-xl font-bold pr-2 pl-2 inline-block align-top">
                {this.predio.nombre}
              </h2>
              <span className="text-xs text-gray-600 inline-block align-baseline pb-1">
                #{this.predio.num_predial}
              </span>
            </div>
          </Link>
          <div className="flex flex-row mx-auto pl-1">
            {/* <button
              title="Editar"
              className="transition duration-500 bg-gray-200 rounded-md p-1 mt-3 mb-3 ml-2 mr-1 flex content-center items-center justify-center pr-2 text-xs font-base hover:bg-blue-400 hover:text-white hover:font-bold"
            >
              <PencilIcon size={12} className="ml-1" />
            </button> */}
            <button
              id="butEliminarPredio"
              title="Eliminar"
              value={this.predio.num_predial}
              className="transition duration-500 bg-gray-200 rounded-md p-1 mt-3 mb-3 ml-1 mr-2 flex content-center items-center justify-center pr-2 text-xs font-base hover:bg-red-400 hover:text-white hover:font-bold"
              onClick={this.handleClick.bind(this)}
            >
              <TrashIcon className="ml-1" size={12} />
            </button>
          </div>
        </div>
        <Link href={`/predio/${this.predio.id_predial}`}>
          <div className="border w-2/3 bg-gray-100 h-12 rounded-b-lg w-full h-auto">
            <div className="grid grid-col-1 gap-y-1 m-3 text-sm text-gray-700 ml-6 mt-4 mb-4">
              <p>
                <LawIcon size={16} />{" "}
                <span className="font-bold">Avaluo: </span>${this.predio.avaluo}
              </p>
              <p>
                {this.predio.predio_propietario.length < 2 ? (
                  <React.Fragment>
                    <PersonIcon size={16} />{" "}
                    <span className="font-bold">Propietario:</span>{" "}
                    {this.predio.predio_propietario.length}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <PeopleIcon size={16} />{" "}
                    <span className="font-bold">Propietarios:</span>{" "}
                    {this.predio.predio_propietario.length}
                  </React.Fragment>
                )}
              </p>
              <p>
                <OrganizationIcon size={16} />{" "}
                <span className="font-bold">Construcciones:</span>{" "}
                {this.predio.predio_construccion.length}
              </p>
              <p>
                <ScreenFullIcon size={16} />{" "}
                {this.predio.terreno ? (
                  <React.Fragment>
                    Terreno {this.predio.terreno.tipo_terreno.desc_tipo_terreno}{" "}
                    de {this.predio.terreno.area} km²
                  </React.Fragment>
                ) : (
                  <React.Fragment>Sin terreno asignado</React.Fragment>
                )}
              </p>
              <p>
                <LocationIcon size={16} /> {this.predio.municipio.municipio},{" "}
                {this.capitalize(
                  this.predio.departamento.departamento.toLowerCase()
                )}
              </p>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
