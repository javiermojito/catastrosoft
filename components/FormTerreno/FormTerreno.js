import React, { Component } from "react";
import { getPredioById, insertTerrenoPredio } from "../../lib/PredioAPI";
import { getTipoTerreno, insertTerreno } from "../../lib/TerrenoAPI";
import Swal from "sweetalert2";

export default class FormTerreno extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tipo_terreno: [],
    };
    this.formRef = React.createRef();
    this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.loadTipoTerreno();
  }

  async loadTipoTerreno() {
    let tiposTerreno = await getTipoTerreno();
    this.setState({
      ...this.state,
      tipo_terreno: tiposTerreno.tipo_terreno,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let predio = this.props.predio;
    let data = {};
    data.area_terreno = e.target.area.value;
    data.esCercaAgua_terreno = e.target.cbCercaFuentesAgua.checked;
    data.idTipo_terreno = e.target.terrenos.value;
    data.tieneConstrucciones_terreno = e.target.cbTieneConstrucciones.checked;
    data.valorComercial_terreno = e.target.valorComercial.value;

    insertTerreno(data).then((res) => {
      insertTerrenoPredio(res, predio).then((res) => {
        if (res) {
          Swal.fire(
            "¡Terreno agregado!",
            "El terreno ha sido agregado correctamente.",
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
                        <p className="font-bold text-lg ">Añadir Terreno</p>
                      )}
                      <p className="mb-4 text-sm text-gray-500">
                        Los campos con * son obligatorios
                      </p>
                      <label
                        htmlFor="area"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Área del terreno*
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="number"
                          name="area"
                          id="area"
                          placeholder="325"
                          className="border rounded pl-2
                            active:ring-indigo-500 active:border-indigo-500 flex-1 block w-full sm:text-sm border-gray-300"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="valorComercial"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Valor comercial del terreno*
                    </label>
                    <div class="mt-1">
                      <input
                        type="number"
                        name="valorComercial"
                        id="valorComercial"
                        placeholder="12500000"
                        className="border rounded pl-2
                            active:ring-indigo-500 active:border-indigo-500 flex-1 block w-full sm:text-sm border-gray-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="cbCercaFuentesAgua"
                      id="cbCercaFuentesAgua"
                      className="mr-2"
                    />
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="cbCercaFuentesAgua"
                    >
                      Este terreno se encuentra a fuentes de agua*
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="cbTieneConstrucciones"
                      id="cbTieneConstrucciones"
                      className="mr-2"
                    />
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="cbTieneConstrucciones"
                    >
                      Este terreno contiene construcciones*
                    </label>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="opTerrenos"
                    >
                      Tipo de Terreno*
                    </label>
                    <select
                      name="terrenos"
                      id="opTerrenos"
                      className="rounded p-1 bg-white border"
                    >
                      {this.state.tipo_terreno
                        ? this.state.tipo_terreno.map((tipo) => {
                            return (
                              <option value={tipo.id_tipo_terreno}>
                                {tipo.desc_tipo_terreno}
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
