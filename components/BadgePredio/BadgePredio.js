import React, { Component, Fragment } from "react";
import Link from "next/link";

import {
  KebabHorizontalIcon,
  LawIcon,
  LocationIcon,
  PersonIcon,
  OrganizationIcon,
  ScreenFullIcon,
} from "@primer/octicons-react";

export default class BadgePredio extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.predio);
    this.state = {
      isOpen: false,
    };
    this.predio = {
      ...props.predio,
    };
  }

  // <Link href={`/predio/${this.predio.id_predial}`}>
  render() {
    return (
      <div className="h-24 w-96 mx-auto h-full cursor-pointer transition hover:shadow-md">
        <div className="flex flex-row justify-between	content-center text-center border-t border-l border-r rounded-t-lg w-full shadow">
          <Link href={`/predio/${this.predio.id_predial}`}>
            <div className="pl-2 flex flex-row my-auto items-end pt-2 pl-2 pb-2 w-5/6 border-r">
              <h2 className="text-xl font-bold pr-2 pl-2 inline-block align-top">
                {this.predio.nombre}
              </h2>
              <span className="text-xs text-gray-600 inline-block align-baseline pb-1">
                #{this.predio.num_predial || "000001"}
              </span>
            </div>
          </Link>
          <button className="w-1/6 flex justify-center content-center my-auto">
            <KebabHorizontalIcon
              size={16}
              className="transition duration-800 text-gray-400 cursor-pointer hover:text-gray-800"
            />
          </button>
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
                    <span className="font-bold">Propietarios:</span>{" "}
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
                {this.predio.predio_propietario.length}
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
                {this.predio.departamento.departamento}
              </p>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
