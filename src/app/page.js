

'use client'

import { Globalcontext } from "@/contex";
import { useContext } from "react";

export default function Home() {
  const {isAuthUser} = useContext(Globalcontext)
  console.log(isAuthUser)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <h1>Ecommerce Website</h1>
    </main>
  );
}
