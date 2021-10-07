import React from "react";
import { HeartFillIcon } from "@primer/octicons-react";

function Footer() {
  return (
    <div className="h-14 w-full shadow grid content-center relative	text-center	border">
      <p>
        Hecho con <HeartFillIcon size={16} /> por{" "}
        <a
          className="text-gray-600"
          href="http://javiermojito.com"
          target="_blank"
        >
          Javier Mojito
        </a>
      </p>
    </div>
  );
}

export default Footer;
