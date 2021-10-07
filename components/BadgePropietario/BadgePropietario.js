import React, { Component } from "react";
import {
  CommentDiscussionIcon,
  CreditCardIcon,
  HomeIcon,
  MailIcon,
  FileBadgeIcon,
  PencilIcon,
  PersonIcon,
  TrashIcon,
  FileBinaryIcon,
} from "@primer/octicons-react";

export default class BadgePropietario extends Component {
  constructor(props) {
    super(props);
    console.log("Aqui van los props");
    console.log(props);
    this.state = {};
    this.propietario = {
      ...this.props.propietario,
    };
  }

  render() {
    return (
      <div className=" bg-white h-auto shadow rounded w-11/12 mx-auto">
        <div className="flex flex-row items-center m-2 ml-4 border-b ">
          {this.propietario.es_persona_natural ? (
            <PersonIcon size={16} className="mr-2" />
          ) : (
            <FileBadgeIcon size={16} className="mr-2" />
          )}
          <p className="font-normal text-lg w-10/12 truncate">
            {this.propietario.es_persona_natural
              ? `${this.propietario.nombres} ${this.propietario.apellidos}`
              : `${this.propietario.razon_social}`}
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
          {/* Información principal de un propiterio */}
          <li className="text-sm text-gray-600">
            <HomeIcon size={13} className="mr-1.5" />
            {this.propietario.direccion}
          </li>
          <li className="text-sm text-gray-600">
            <CommentDiscussionIcon size={13} className="mr-1.5" />
            {this.propietario.telefono}
          </li>
          {this.propietario.correo_electronico ? (
            <li className="text-sm text-gray-600">
              <MailIcon size={13} className="mr-1.5" />
              {this.propietario.correo_electronico}
            </li>
          ) : null}

          {/* Verifica si es persona natural o juridica para agregar el resto de información */}
          {this.propietario.es_persona_natural ? (
            <React.Fragment>
              <li className="text-sm text-gray-600 ">
                <CreditCardIcon size={13} className="mr-1.5" />
                {this.propietario.tipo_documento.desc_corta}{" "}
                {this.propietario.num_documento}
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li className="text-sm text-gray-600 ">
                <FileBinaryIcon size={13} className="mr-1.5" />
                NIT {this.propietario.nit}
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    );
  }
}
