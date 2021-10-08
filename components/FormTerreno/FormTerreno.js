import React, { Component } from "react";
import { getTipoTerreno } from "../../lib/TerrenoAPI";

export default class FormTerreno extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tipo_terreno: [],
    };
  }

  componentDidMount() {
    this.loadTipoTerreno();
  }

  async loadTipoTerreno() {
    let tiposTerreno = await getTipoTerreno();
    console.log("asd");
    console.log(tiposTerreno);
    this.setState({
      ...this.state,
      tipo_terreno: tiposTerreno.tipo_terreno,
    });
  }

  render() {
    return (
      <div className="overflow-y-auto mx-auto ">
        <div class="">
          <div class="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div class="shadow sm:rounded-md sm:overflow-hidden">
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div class="">
                    <div class="col-span-3 sm:col-span-2">
                      {this.props.add && (
                        <p className="font-bold text-lg ">Añadir Terreno</p>
                      )}
                      <p class="mb-4 text-sm text-gray-500">
                        Los campos con * son obligatorios
                      </p>
                      <label
                        for="company-website"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Área del terreno*
                      </label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="number"
                          name="area"
                          id="area"
                          placeholder="5"
                          className="border rounded pl-2
                            active:ring-indigo-500 active:border-indigo-500 flex-1 block w-full sm:text-sm border-gray-300"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      for="valor_comercial"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Valor comercial del terreno*
                    </label>
                    <div class="mt-1">
                      <input
                        type="number"
                        name="valor_comercial"
                        id="valor_comercial"
                        placeholder="5"
                        className="border rounded pl-2
                            active:ring-indigo-500 active:border-indigo-500 flex-1 block w-full sm:text-sm border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" className="mr-2" />
                    <label class="block text-sm font-medium text-gray-700">
                      Este terreno se encuentra a fuentes de agua*
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" className="mr-2" />
                    <label class="block text-sm font-medium text-gray-700">
                      Este terreno contiene construcciones*
                    </label>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">
                      Tipo de Terreno*
                    </label>
                    <select
                      name=""
                      id=""
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
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
