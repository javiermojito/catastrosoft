const API_URL = "https://meet-kit-72.hasura.app/api/rest";
const DEFAULT_HEADER = {
  "content-type": "application/json",
  "Hasura-Client-Name": "hasura-console",
  "x-hasura-admin-secret":
    "ITIb3q708P0KJkG0MTuP7k8pXcJd2IVInFNxoP9niRuI8uH0zgvXMdnpeFyrRGoA",
};

module.exports = {
  async deleteConstruccion(id_construccion, id_predio) {
    const target = new URL(`${API_URL}/deleteConstruccionPredio`);
    const params = new URLSearchParams();
    try {
      params.set("id_construccion", Number(id_construccion));
      params.set("id_predio", Number(id_predio));

      target.search = params.toString();

      const response = await fetch(target, {
        method: "DELETE",
        headers: { ...DEFAULT_HEADER },
      });

      if (response.status === 200) return true;
      else return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  async getTipoConstruccion() {
    const target = new URL(`${API_URL}/getTipoConstruccion`);
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

  async insertConstruccion({ area, direccion, idTipoConstruccion, numPisos }) {
    const target = new URL(`${API_URL}/insertConstruccion`);
    const params = new URLSearchParams();
    try {
      params.set("area", Number(area));
      params.set("direccion", direccion);
      params.set("idTipoConstruccion", Number(idTipoConstruccion));
      params.set("numPisos", Number(numPisos));

      target.search = params.toString();

      const response = await fetch(target, {
        method: "POST",
        headers: { ...DEFAULT_HEADER },
      });

      const data = await response.json();
      return data.insert_construccion_one.id_construccion;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
