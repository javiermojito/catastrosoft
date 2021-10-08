const API_URL = "https://meet-kit-72.hasura.app/api/rest";
const DEFAULT_HEADER = {
  "content-type": "application/json",
  "Hasura-Client-Name": "hasura-console",
  "x-hasura-admin-secret":
    "ITIb3q708P0KJkG0MTuP7k8pXcJd2IVInFNxoP9niRuI8uH0zgvXMdnpeFyrRGoA",
};

module.exports = {
  async getTipoTerreno() {
    const target = new URL(`${API_URL}/getTipoTerreno`);
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

  async insertTerreno({
    area_terreno,
    esCercaAgua_terreno,
    idTipo_terreno,
    valorComercial_terreno,
    tieneConstrucciones_terreno,
  }) {
    const target = new URL(`${API_URL}/insertTerreno`);
    const params = new URLSearchParams();
    try {
      params.set("area_terreno", Number(area_terreno));
      params.set("esCercaAgua_terreno", Boolean(esCercaAgua_terreno));
      params.set("idTipo_terreno", Number(idTipo_terreno));
      params.set(
        "tieneConstrucciones_terreno",
        Boolean(tieneConstrucciones_terreno)
      );
      params.set("valorComercial_terreno", Number(valorComercial_terreno));

      target.search = params.toString();

      const response = await fetch(target, {
        method: "POST",
        headers: { ...DEFAULT_HEADER },
      });

      const data = await response.json();
      return data.insert_terreno_one.id_terreno;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
