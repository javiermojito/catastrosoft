import React, { Component } from "react";
import { getPredioById, insertConstruccionPredio } from "../../lib/PredioAPI";
import Swal from "sweetalert2";
import {
  getTipoConstruccion,
  insertConstruccion,
} from "../../lib/ConstruccionAPI";

export class FormConstruccion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tipo_construccion: [],
    };
    this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.loadTipoConstruccion();
  }

  async loadTipoConstruccion() {
    let tiposConstruccion = await getTipoConstruccion();
    this.setState({
      ...this.state,
      tipo_construccion: tiposConstruccion.tipo_construccion,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let predio = this.props.predio;
    let data = {};
    data.area = e.target.area.value;
    data.direccion = e.target.direccion.value;
    data.idTipoConstruccion = e.target.tiposConstrucciones.value;
    data.numPisos = e.target.numPisos.value;

    insertConstruccion(data).then((res) => {
      insertConstruccionPredio(res, predio).then((res) => {
        if (res) {
          Swal.fire(
            "¡Construcción agregada!",
            "La Construcción ha sido agregada correctamente.",
            "Exito"
          );
          getPredioById(predio).then((res) => {
            this.props.reload(res);
            this.props.close();
          });
        } else {
          alert("ocurrio un error");
        }
      });
    });
  }

  render() {
    return (
      <div className="overflow-y-auto mx-auto ">
        <div className="">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="">
                    <div className="col-span-3 sm:col-span-2">
                      {this.props.add && (
                        <p className="font-bold text-lg ">
                          Añadir Construcción
                        </p>
                      )}
                      <p className="mb-4 text-sm text-gray-500">
                        Los campos con * son obligatorios
                      </p>
                      <label
                        htmlFor="area"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Área de total de la Construcción*
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="number"
                          name="area"
                          id="area"
                          placeholder="145"
                          className="border rounded pl-2
                            active:ring-indigo-500 active:border-indigo-500 flex-1 block w-full sm:text-sm border-gray-300"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="direccion"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Dirección de la construcción*
                    </label>
                    <div class="mt-1">
                      <input
                        type="text"
                        name="direccion"
                        id="direccion"
                        placeholder="Cr.1 #89-A"
                        className="border rounded pl-2
                            active:ring-indigo-500 active:border-indigo-500 flex-1 block w-full sm:text-sm border-gray-300"
                        required
                        autoComplete="address"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="numPisos"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Número de pisos*
                    </label>
                    <div class="mt-1">
                      <input
                        type="number"
                        name="numPisos"
                        id="numPisos"
                        placeholder="5"
                        className="border rounded pl-2
                            active:ring-indigo-500 active:border-indigo-500 flex-1 block w-full sm:text-sm border-gray-300"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="tiposConstrucciones"
                    >
                      Tipo de Construcción*
                    </label>
                    <select
                      name="tiposConstrucciones"
                      id="optiposConstrucciones"
                      className="rounded p-1 bg-white border mt-1 w-full"
                    >
                      {this.state.tipo_construccion
                        ? this.state.tipo_construccion.map((tipo) => {
                            return (
                              <option value={tipo.id_tipo_construccion}>
                                {tipo.desc_tipo_construccion}
                              </option>
                            );
                          })
                        : null}
                    </select>
                  </div>
                </div>
                <div className="px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    value={this.props.predio}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default FormConstruccion;
