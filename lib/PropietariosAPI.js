const API_URL = "https://meet-kit-72.hasura.app/api/rest";
const DEFAULT_HEADER = {
  "content-type": "application/json",
  "Hasura-Client-Name": "hasura-console",
  "x-hasura-admin-secret":
    "ITIb3q708P0KJkG0MTuP7k8pXcJd2IVInFNxoP9niRuI8uH0zgvXMdnpeFyrRGoA",
};

module.exports = {
  async getTipoDocumento() {
    const target = new URL(`${API_URL}/getTipoDocumento`);
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

  async insertPropietario({
    direccion,
    telefono,
    correo,
    esPersonaNatural,
    esPersonaJuridica,
    id_Tipo_Documento,
    numDocumento,
    nombres,
    apellidos,
    nit,
    razonSocial,
  }) {
    const target = new URL(`${API_URL}/insertPropietario`);
    const params = new URLSearchParams();
    try {
      params.set("direccion", direccion);
      params.set("telefono", telefono);
      params.set("correo", correo);
      params.set("esPersonaNatural", Boolean(esPersonaNatural));
      params.set("esPersonaJuridica", Boolean(esPersonaJuridica));
      params.set(
        "id_Tipo_Documento",
        id_Tipo_Documento ? Number(id_Tipo_Documento) : null
      );
      params.set("numDocumento", numDocumento);
      params.set("nombres", nombres);
      params.set("apellidos", apellidos);
      params.set("nit", nit);
      params.set("razonSocial", razonSocial);

      target.search = params.toString();

      const response = await fetch(target, {
        method: "POST",
        headers: { ...DEFAULT_HEADER },
      });

      const data = await response.json();
      return data.insert_propietario_one.id_propietario;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
