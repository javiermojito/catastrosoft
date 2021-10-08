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
import { deletePropietario } from "../../lib/PropietariosAPI";
import { getPredioById } from "../../lib/PredioAPI";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default class BadgePropietario extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.propietario = {
      ...this.props.propietario,
    };
  }

  handleClick(e) {
    if (e.target.id === "butEliminarPropietario")
      this.checkDeletePropietario(e.target.value, this.props.predio);
  }

  handleClickDelete(e) {
    let value;
    if (e.target.nodeName === "path") {
      value = e.target.parentElement.parentElement.value;
    } else if (e.target.nodeName === "svg") {
      value = e.target.parentElement.value;
    } else {
      value = e.target.value;
    }
    if (value) this.checkDeletePropietario(value, this.props.predio);
  }

  async checkDeletePropietario(id_propietario, id_predio) {
    let MySwal = withReactContent(Swal);
    MySwal.fire({
      title: `¿Seguro que desea eliminar este propietario?`,
      text: "Esta acción no se puede revertir.",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí, elimínalo",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePropietario(id_propietario, id_predio).then((res) => {
          if (res) {
            Swal.fire(
              "¡Propietario Eliminado!",
              "El propietario ha sido eliminado correctamente.",
              "Exito"
            ).then(() => {
              getPredioById(id_predio).then((res) => {
                this.props.reload(res);
              });
            });
          } else {
            alert("ocurrio un error");
          }
        });
      }
    });
  }

  render() {
    return (
      <div className=" bg-white h-40 shadow rounded w-11/12 mx-auto">
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
              onClick={this.handleClickDelete.bind(this)}
              value={this.propietario.id_propietario}
            >
              <TrashIcon className="ml-1" size={12} />
            </button>
          </div>
        </div>
        <ul className="ml-4 mb-2">
          {/* Información principal de un propietario */}
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
