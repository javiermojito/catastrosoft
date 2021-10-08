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
};
