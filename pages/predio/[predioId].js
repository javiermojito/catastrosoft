import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Predio = () => {
  const {
    query: { predioId },
  } = useRouter();
  const [predio, setPredio] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("id", predioId);

    const target = new URL(
      "https://meet-kit-72.hasura.app/api/rest/getPredioById"
    );
    target.search = params.toString();

    //console.log(predio);
    //console.log(predioId);
    //console.log(Boolean(predioId));
    if (predioId) {
      let req = new XMLHttpRequest();
      req.open("GET", target, true);
      req.setRequestHeader("content-type", "application/json");
      req.setRequestHeader("Hasura-Client-Name", "hasura-console");
      req.setRequestHeader(
        "x-hasura-admin-secret",
        "ITIb3q708P0KJkG0MTuP7k8pXcJd2IVInFNxoP9niRuI8uH0zgvXMdnpeFyrRGoA"
      );

      req.send();
      req.onload = () => {
        const data = JSON.parse(req.responseText);
        console.log(data.predio_by_pk);
        setPredio(data.predio_by_pk);
      };
    }
  }, [predioId]);

  return (
    <div>
      <h1 className="bg-gray-200">El ID del predio es: {predioId}</h1>
      <p>{predio?.avaluo}</p>
      <p>{predio?.nombre}</p>
      <p>{predio?.num_predial}</p>
    </div>
  );
};

export default Predio;
