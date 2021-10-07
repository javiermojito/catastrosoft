import React, { useState, useEffect } from "react";
import { PackageIcon, PlusIcon } from "@primer/octicons-react";
import BadgePredio from "../components/BadgePredio/BadgePredio";
import Footer from "../components/Footer/Footer";
import Link from "next/link";

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
    <React.Fragment>
      <div className="h-full md:h-screen">
        <main className="pt-7 pl-7 pb-7 flex">
          <h1 className="text-4xl flex items-center font-bold">
            <PackageIcon size={28} className="mr-2" /> Predios
          </h1>
          <Link href="/addPredio" className="">
            <button className=" transition duration-500 bg-gray-200 rounded-md p-1 m-3 flex content-center items-center justify-center pr-2 text-xs font-base hover:bg-green-400 hover:text-white hover:font-bold">
              <PlusIcon size={12} className="mr-1 ml-1" /> Añadir
            </button>
          </Link>
        </main>
        <div className="grid w-full mb-6 mx-auto grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 ">
          {predioList.map((predio) => {
            return <BadgePredio predio={predio} key={predio.id_predial} />;
          })}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
