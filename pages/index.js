import Head from "next/head";
import { useState } from "react";
// import styles from '../styles/Home.module.css';
import Link from "next/link";

export default function Home() {
  const [protagonista, setProtagonista] = useState("");
  const [lugar, setLugar] = useState("");
  const [primeraParte, setPrimeraParte] = useState("");
  const [A, setA] = useState();
  const [B, setB] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          protagonista: protagonista,
          lugar: lugar
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      const parts = data.result.split("\n");
      setPrimeraParte(parts[2].replace("1. ", ""))
      setA(parts[4].replace("2. Opción A: ", ""))
      setB(parts[6].replace("3. Opción B: ", ""))

      // part1 = part1.replace("1. ", "")
      // part2 = part2.replace("2. Opción A: .", "")
      // part3 = part3.replace("3. Opción B: .", "")

      console.log('primeraParte:', primeraParte);
      console.log('A:', A);
      console.log('B:', B);


      // console.log("REUSLTADO", data.result);
      //setResult(data.result);
      setProtagonista("");
      setLugar("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  // console.log('result', result)

  return (
    <div className="container">
      <Head>
        <title>Cuéntame un cuento</title>
      </Head>

      <main>
        <Link href='/about'>Abaut</Link>
        <h2>Cuéntame un cuento</h2>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="protagonista"
            placeholder="protagonista..."
            value={protagonista}
            onChange={(e) => setProtagonista(e.target.value)}
          />
          <input
            type="text"
            name="lugar"
            placeholder="un lugar..."
            value={lugar}
            onChange={(e) => setLugar(e.target.value)}
          />
          <input type="submit" value="Crea el cuento" />
        </form>
        <div>{primeraParte}</div>
        {A && <button>{A}</button>}
        {B && <button>{B}</button>}
      </main>
    </div>
  );
}
