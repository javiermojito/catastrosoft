const API_URL = "https://meet-kit-72.hasura.app/api/rest";
const DEFAULT_HEADER = {
  "content-type": "application/json",
  "Hasura-Client-Name": "hasura-console",
  "x-hasura-admin-secret":
    "ITIb3q708P0KJkG0MTuP7k8pXcJd2IVInFNxoP9niRuI8uH0zgvXMdnpeFyrRGoA",
};

module.exports = {
  async getPredios() {
    const target = new URL(`${API_URL}/getPredios`);
    try {
      const response = await fetch(target, {
        method: "GET",
        headers: { ...DEFAULT_HEADER },
      });

      const data = await response.json();
      return data.predio;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  async getPredioById(id_predio) {
    console.log("PredioAPI");
    console.log(id_predio);
    const target = new URL(`${API_URL}/getPredioById`);
    const params = new URLSearchParams();
    try {
      params.set("id", Number(id_predio));

      target.search = params.toString();

      const response = await fetch(target, {
        method: "GET",
        headers: { ...DEFAULT_HEADER },
      });

      const data = await response.json();
      return data.predio_by_pk;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  async deleteTerrenoPredio(id_terreno, id_predio) {
    console.log("PredioAPI");
    console.log(id_predio);
    const target = new URL(`${API_URL}/deleteTerrenoPredio`);
    const params = new URLSearchParams();
    try {
      params.set("id_predio", Number(id_predio));
      params.set("id_terreno", Number(id_terreno));

      target.search = params.toString();

      const response = await fetch(target, {
        method: "DELETE",
        headers: { ...DEFAULT_HEADER },
      });

      if (response.status === 200) return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  async insertTerrenoPredio(id_terreno, id_predio) {
    const target = new URL(`${API_URL}/insertTerrenoPredio`);
    const params = new URLSearchParams();
    try {
      params.set("id_predio", Number(id_predio));
      params.set("id_terreno", Number(id_terreno));

      target.search = params.toString();

      const response = await fetch(target, {
        method: "POST",
        headers: { ...DEFAULT_HEADER },
      });

      if (response.status === 200) return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  async insertConstruccionPredio(id_construccion, id_predio) {
    const target = new URL(`${API_URL}/insertConstruccionPredio`);
    const params = new URLSearchParams();
    try {
      params.set("id_predio", Number(id_predio));
      params.set("id_construccion", Number(id_construccion));

      target.search = params.toString();

      const response = await fetch(target, {
        method: "POST",
        headers: { ...DEFAULT_HEADER },
      });

      if (response.status === 200) return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  async insertPropietarioPredio(id_propietario, id_predio) {
    const target = new URL(`${API_URL}/insertPropietarioPredio`);
    const params = new URLSearchParams();
    try {
      params.set("id_predio", Number(id_predio));
      params.set("id_propietario", Number(id_propietario));

      target.search = params.toString();

      const response = await fetch(target, {
        method: "POST",
        headers: { ...DEFAULT_HEADER },
      });

      if (response.status === 200) return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  async getDepartamentos() {
    const target = new URL(`${API_URL}/getDepartamentos`);
    try {
      const response = await fetch(target, {
        method: "GET",
        headers: { ...DEFAULT_HEADER },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  async getMunicipioByDepartamentoId(departamento) {
    const target = new URL(`${API_URL}/getMunicipioByDepartamentoId`);
    const params = new URLSearchParams();
    try {
      params.set("id", Number(departamento));
      target.search = params.toString();

      const response = await fetch(target, {
        method: "GET",
        headers: { ...DEFAULT_HEADER },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  async insertPredio({ nombre, avaluo, id_departamento, id_municipio }) {
    const target = new URL(`${API_URL}/insertPredio`);
    const params = new URLSearchParams();
    try {
      params.set("nombre", nombre);
      params.set("avaluo", Number(avaluo));
      params.set("id_departamento", Number(id_departamento));
      params.set("id_municipio", Number(id_municipio));

      target.search = params.toString();

      const response = await fetch(target, {
        method: "POST",
        headers: { ...DEFAULT_HEADER },
      });

      if (response.status === 200) return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  async deletePredio(id_predio) {
    const target = new URL(`${API_URL}/deletePredio`);
    const params = new URLSearchParams();
    try {
      params.set("id_predio", Number(id_predio));

      target.search = params.toString();

      const response = await fetch(target, {
        method: "DELETE",
        headers: { ...DEFAULT_HEADER },
      });

      if (response.status === 200) return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
};
