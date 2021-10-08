const API_URL = "https://meet-kit-72.hasura.app/api/rest";
const DEFAULT_HEADER = {
  "content-type": "application/json",
  "Hasura-Client-Name": "hasura-console",
  "x-hasura-admin-secret":
    "ITIb3q708P0KJkG0MTuP7k8pXcJd2IVInFNxoP9niRuI8uH0zgvXMdnpeFyrRGoA",
};

module.exports = {
  async deletePropietario(id_propietario, id_predio) {
    const target = new URL(`${API_URL}/deletePropietarioPredio`);
    const params = new URLSearchParams();
    try {
      params.set("id_propietario", Number(id_propietario));
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
};
