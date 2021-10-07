import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <main>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/predio/1">
          <a>predio 1</a>
        </Link>
      </main>
    </nav>
  );
}
