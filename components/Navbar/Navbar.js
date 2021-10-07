import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="grid w-full h-12 justify-center	shadow content-center">
      <main>
        <Link href="/">
          <a className="text-base font-semibold text-black">Catastrosoft</a>
        </Link>
      </main>
    </nav>
  );
}
