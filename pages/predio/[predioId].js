import React from "react";
import { useRouter } from "next/router";

const Predio = () => {
  const route = useRouter();
  return <div>El ID del predio es: {route.query.predioId}</div>;
};

export default Predio;
