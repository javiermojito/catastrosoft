import {
  CommentDiscussionIcon,
  ContainerIcon,
  HomeIcon,
  ImageIcon,
  ListOrderedIcon,
  LocationIcon,
  PencilIcon,
  StackIcon,
  TableIcon,
  TagIcon,
  TrashIcon,
} from "@primer/octicons-react";
import React, { Component } from "react";

export default class BadgeConstruccion extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(props);
    this.construccion = {
      ...this.props.construccion,
    };
  }

  capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  render() {
    return (
      <div className=" bg-white h-auto shadow rounded w-11/12 mx-auto">
        <div className="flex flex-row items-center m-2 ml-4 border-b ">
          <ContainerIcon size={16} className="mr-2" />
          <p className="font-normal text-lg w-10/12 truncate">
            Construccion {this.construccion.id_construccion}
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
            {this.construccion.direccion}
          </li>
          <li className="text-sm text-gray-600">
            <StackIcon size={13} className="mr-1.5" />
            {this.construccion.num_pisos === 0 && "Sin pisos"}
            {this.construccion.num_pisos === 1
              ? `${this.construccion.num_pisos} piso`
              : `${this.construccion.num_pisos} pisos`}
          </li>
          <li className="text-sm text-gray-600">
            <TableIcon size={13} className="mr-1.5" />
            {this.construccion.area_total} km² de area total
          </li>
          <li className="text-sm text-gray-600">
            <TagIcon size={13} className="mr-1.5" />
            Construcción{" "}
            {this.capitalize(
              this.construccion.tipo_construccion.desc_tipo_construccion.toLowerCase()
            )}
          </li>
        </ul>
      </div>
    );
  }
}