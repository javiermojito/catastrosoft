import React, { Component } from "react";
import { getPredioById, insertPropietarioPredio } from "../../lib/PredioAPI";
import Swal from "sweetalert2";
import { getTipoDocumento, insertPropietario } from "../../lib/PropietariosAPI";

export class FormPropietario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      esPersonaNatural: true,
      esPersonaJuridica: false,
      tipo_documento: [],
    };
    this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.loadTipoDocumento();
  }

  setRadioOptions() {}

  async loadTipoDocumento() {
    let tiposDocumento = await getTipoDocumento();
    this.setState({
      ...this.state,
      tipo_documento: tiposDocumento.tipo_documento,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let predio = this.props.predio;
    let data = {};
    data.direccion = e.target.direccion.value;
    data.telefono = e.target.telefono.value;
    data.correo = e.target.correo.value === "" ? null : e.target.correo.value;
    data.esPersonaNatural = e.target.esPersonaNatural.checked;
    data.esPersonaJuridica = e.target.esPersonaJuridica.checked;

    if (e.target.esPersonaNatural.checked) {
      data.id_Tipo_Documento = e.target.tiposDocumentos.value;
      data.numDocumento = e.target.numDocumento.value;
      data.nombres = e.target.nombres.value;
      data.apellidos = e.target.apellidos.value;

      data.nit = null;
      data.razonSocial = null;
    } else {
      data.nit = e.target.nit.value;
      data.razonSocial = e.target.razonSocial.value;

      data.id_Tipo_Documento = null;
      data.numDocumento = null;
      data.nombres = null;
      data.apellidos = null;
    }

    insertPropietario(data).then((res) => {
      insertPropietarioPredio(res, predio).then((res) => {
        if (res) {
          Swal.fire(
            "¡Propietario agregado!",
            "El propietario ha sido agregado correctamente.",
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

  handleChange(e) {
    if (e.target.id === "esPersonaJuridica") {
      this.setState({
        ...this.state,
        esPersonaNatural: false,
        esPersonaJuridica: true,
      });
    } else {
      this.setState({
        ...this.state,
        esPersonaNatural: true,
        esPersonaJuridica: false,
      });
    }
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
                        <p className="font-bold text-lg ">Añadir Propietario</p>
                      )}
                      <p className="mb-4 text-sm text-gray-500">
                        Los campos con * son obligatorios
                      </p>
                      <label
                        htmlFor="area"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tipo de Propietario*
                      </label>

                      <div className="mt-1 flex rounded-md shadow-sm items-center">
                        <input
                          type="radio"
                          name="esPersonaNatural"
                          id="esPersonaNatural"
                          className=" mr-1"
                          onChange={this.handleChange.bind(this)}
                          checked={this.state.esPersonaNatural}
                        />{" "}
                        Persona Natural
                        <input
                          type="radio"
                          name="esPersonaJuridica"
                          id="esPersonaJuridica"
                          className="ml-3 mr-1"
                          onChange={this.handleChange.bind(this)}
                          checked={this.state.esPersonaJuridica}
                        />{" "}
                        Persona Jurídica
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="direccion"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Dirección del propietario*
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
                      htmlFor="telefono"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Número de teléfono*
                    </label>
                    <div class="mt-1">
                      <input
                        type="text"
                        name="telefono"
                        id="telefono"
                        placeholder="3017007090"
                        className="border rounded pl-2
                            active:ring-indigo-500 active:border-indigo-500 flex-1 block w-full sm:text-sm border-gray-300"
                        required
                        autoComplete="tel"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="correo"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Correo Electrónico
                    </label>
                    <div class="mt-1">
                      <input
                        type="text"
                        name="correo"
                        id="correo"
                        placeholder="me@mail.com"
                        className="border rounded pl-2
                            active:ring-indigo-500 active:border-indigo-500 flex-1 block w-full sm:text-sm border-gray-300"
                        autoComplete="email"
                      />
                    </div>
                  </div>
                  {this.state.esPersonaNatural ? (
                    <React.Fragment>
                      <div className="grid grid-cols-2">
                        <div className="mr-2">
                          <label
                            htmlFor="nombres"
                            className="text-sm font-medium text-gray-700"
                          >
                            Nombres*
                          </label>
                          <div class="mt-1">
                            <input
                              type="text"
                              name="nombres"
                              id="nombres"
                              placeholder="Juan Andrés"
                              className="border rounded pl-2
                            active:ring-indigo-500 active:border-indigo-500 flex-1 block w-full sm:text-sm border-gray-300"
                              required
                              autoComplete="given-name"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="apellidos"
                            className=" text-sm font-medium text-gray-700"
                          >
                            Apellidos*
                          </label>
                          <div class="mt-1">
                            <input
                              type="text"
                              name="apellidos"
                              id="apellidos"
                              placeholder="Gómez Pérez"
                              className="border rounded pl-2
                            active:ring-indigo-500 active:border-indigo-500 flex-1 block w-full sm:text-sm border-gray-300"
                              required
                              autoComplete="family-name"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2">
                        <div className="mr-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Tipo de Documento*
                          </label>
                          <select
                            name="tiposDocumentos"
                            id="opTiposDocumentos"
                            className="rounded p-1 bg-white border mt-1 w-auto text-xs"
                          >
                            {this.state.tipo_documento
                              ? this.state.tipo_documento.map((tipo) => {
                                  return (
                                    <option value={tipo.id_tipo_documento}>
                                      {tipo.desc_larga}
                                    </option>
                                  );
                                })
                              : null}
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="numDocumento"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Número de documento*
                          </label>
                          <div class="mt-1">
                            <input
                              type="text"
                              name="numDocumento"
                              id="numDocumento"
                              placeholder="123456789"
                              className="border rounded pl-2
                            active:ring-indigo-500 active:border-indigo-500 flex-1 block w-full sm:text-sm border-gray-300"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <div>
                        <label
                          htmlFor="nit"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Número de Identificación Tributaria (NIT)*
                        </label>
                        <div class="mt-1">
                          <input
                            type="text"
                            name="nit"
                            id="nit"
                            placeholder="800.197.268-4"
                            className="border rounded pl-2
                            active:ring-indigo-500 active:border-indigo-500 flex-1 block w-full sm:text-sm border-gray-300"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="razonSocial"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Razón social*
                        </label>
                        <div class="mt-1">
                          <input
                            type="text"
                            name="razonSocial"
                            id="razonSocial"
                            placeholder="Dunder Mifflin Paper Company, Inc. "
                            className="border rounded pl-2
                            active:ring-indigo-500 active:border-indigo-500 flex-1 block w-full sm:text-sm border-gray-300"
                            required
                          />
                        </div>
                      </div>
                    </React.Fragment>
                  )}
                </div>
                <div className="px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    value={this.props.predio}
                    onSubmit={this.handleSubmit}
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

export default FormPropietario;
