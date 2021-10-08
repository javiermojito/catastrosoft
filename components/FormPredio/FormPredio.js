import React, { Component } from "react";
import {
  getDepartamentos,
  getMunicipioByDepartamentoId,
  getPredios,
  insertPredio,
} from "../../lib/PredioAPI";
import Swal from "sweetalert2";

export default class FormPredio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departamentos: [],
      departamentoSelected: false,
      municipios: [],
    };
    this.formRef = React.createRef();
    this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.loadDepartamentos();
  }

  async loadDepartamentos() {
    let departamentos = await getDepartamentos();
    this.setState({
      ...this.state,
      departamentos: departamentos.departamento,
    });
  }

  async loadMunicipiosByDepartamento(departamento) {
    let municipios = await getMunicipioByDepartamentoId(departamento);

    this.setState({
      ...this.state,
      municipios: municipios.municipio,
    });
  }

  handleChange(e) {
    let selected = false;
    if (e.target.value !== "") {
      let deparSelected = Number(e.target.value);
      let isInDepartamentos = this.state.departamentos.find((departamento) => {
        return departamento.id_departamento === deparSelected;
      });
      if (isInDepartamentos) {
        selected = isInDepartamentos;
        this.loadMunicipiosByDepartamento(deparSelected);
      } else {
        this.setState({
          ...this.state,
          municipios: [],
        });
      }
    }

    this.setState({
      ...this.state,
      departamentoSelected: selected,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let predio = this.props.predio;
    let data = {};
    data.nombre = e.target.nombre.value;
    data.avaluo = e.target.avaluo.value;
    if (e.target.departamentos.value === "true") {
      alert("Por favor ingresa un departamento");
      return;
    }
    if (e.target.municipios.value === "true") {
      alert("Por favor ingresa un municipio");
      return;
    }

    data.id_departamento = e.target.departamentos.value;
    data.id_municipio = e.target.municipios.value;

    insertPredio(data).then((res) => {
      if (res) {
        Swal.fire(
          "¡Predio agregado!",
          "El Predio ha sido agregado correctamente.",
          "Exito"
        );
        getPredios().then((res) => {
          this.props.reloadPredioList(res);
          this.props.close();
        });
      } else {
        alert("ocurrio un error");
      }
    });
  }

  capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  hayMunicipios() {
    if (this.state.municipios.length === 0) return "";
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
                      <p className="font-bold text-lg ">Añadir Predio</p>
                      <p className="mb-4 text-sm text-gray-500">
                        Los campos con * son obligatorios
                      </p>
                      <label
                        htmlFor="nombre"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nombre del predio*
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="nombre"
                          id="nombre"
                          placeholder="Hacienda La Bonita"
                          className="border rounded pl-2
                            active:ring-indigo-500 active:border-indigo-500 flex-1 block w-full sm:text-sm border-gray-300"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="avaluo"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Avaluo*
                    </label>
                    <div class="mt-1">
                      <input
                        type="number"
                        name="avaluo"
                        id="avaluo"
                        placeholder="12500000"
                        className="border rounded pl-2
                            active:ring-indigo-500 active:border-indigo-500 flex-1 block w-full sm:text-sm border-gray-300"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="opTerrenos"
                    >
                      Departamento*
                    </label>

                    <select
                      name="departamentos"
                      id="opDepartamentos"
                      className="rounded p-1 border bg-gray-100 w-full"
                      onChange={this.handleChange.bind(this)}
                      required
                    >
                      <option disabled selected value>
                        {" "}
                        Selecciona un departamento{" "}
                      </option>
                      {this.state.departamentos
                        ? this.state.departamentos.map((departamento) => {
                            return (
                              <option value={departamento.id_departamento}>
                                {this.capitalize(
                                  departamento.departamento.toLowerCase()
                                )}
                              </option>
                            );
                          })
                        : null}
                    </select>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="opTerrenos"
                    >
                      Municipio*
                    </label>
                    <select
                      name="municipios"
                      id="opDepartamentos"
                      className="rounded p-1 border bg-gray-100 w-full"
                      disabled={!this.state.departamentoSelected}
                      required
                    >
                      <option disabled selected value>
                        {" "}
                        --{" "}
                      </option>
                      {this.state.municipios?.length >= 1
                        ? this.state.municipios.map((municipio) => {
                            return (
                              <option value={municipio.id_municipio}>
                                {this.capitalize(
                                  municipio.municipio.toLowerCase()
                                )}
                              </option>
                            );
                          })
                        : null}
                    </select>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Los propietarios, construcciones y terreno del Predio{" "}
                      <br />
                      puede ser agregados una vez registrado el predio.
                    </p>
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
