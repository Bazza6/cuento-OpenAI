import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [protagonista, setProtagonista] = useState("");
  const [lugar, setLugar] = useState("");
  const [result, setResult] = useState();

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

      setResult(data.result);
      setProtagonista("");
      setLugar("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Cuéntame un cuento</title>
      </Head>

      <main>
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
        <div>{result}</div>
      </main>
    </div>
  );
}
