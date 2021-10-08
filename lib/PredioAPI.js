const API_URL = "https://meet-kit-72.hasura.app/api/rest";
const DEFAULT_HEADER = {
  "content-type": "application/json",
  "Hasura-Client-Name": "hasura-console",
  "x-hasura-admin-secret":
    "ITIb3q708P0KJkG0MTuP7k8pXcJd2IVInFNxoP9niRuI8uH0zgvXMdnpeFyrRGoA",
};

module.exports = {
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
};
