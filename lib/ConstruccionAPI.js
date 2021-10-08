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
    } catch (error) {
      console.error(error);
      return false;
    }
  },
};
