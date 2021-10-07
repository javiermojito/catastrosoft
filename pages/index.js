import React, { useState, useEffect } from "react";
import { AlertIcon } from "@primer/octicons-react";

const Home = () => {
  const [predioList, setPredioList] = useState([]);

  useEffect(() => {
    window
      .fetch(`https://meet-kit-72.hasura.app/api/rest/getPredios`, {
        method: "GET",
        mode: "cors",
        headers: {
          "content-type": "application/json",
          "Hasura-Client-Name": "hasura-console",
          "x-hasura-admin-secret":
            "ITIb3q708P0KJkG0MTuP7k8pXcJd2IVInFNxoP9niRuI8uH0zgvXMdnpeFyrRGoA",
        },
      })
      .then((res) => res.json())
      .then(({ predio }) => {
        console.log(predio);
        setPredioList(predio);
      });
  }, []);

  return (
    <div className="h-screen">
      <AlertIcon size={16} />
      <h1>Test</h1>
      {predioList.map((predio) => {
        return <div>{predio.nombre}</div>;
      })}
    </div>
  );
};

export default Home;
