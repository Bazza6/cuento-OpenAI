import { useState } from "react";
// import styles from '../styles/Home.module.css';
// import Link from "next/link";
import { Button, Frame, Hourglass } from "react95";
import ProtagonistasList from "../components/protagonistasList";
import LugarList from "../components/lugarList";
import Hola from "../components/hola";

export default function Home() {
  const [protagonista, setProtagonista] = useState("");
  const [lugar, setLugar] = useState("");
  const [primeraParte, setPrimeraParte] = useState("");
  const [A, setA] = useState();
  const [B, setB] = useState();
  const [imageURL, setImageURL] = useState()
  const [final, setFinal] = useState()
  const [disabledInput, setDisabledInput] = useState(false)
  const [disabledButton, setDisableButton] = useState(false)

  async function onSubmit(event) {
    setDisabledInput(true)
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          protagonista: protagonista,
          lugar: lugar,
          type: 'primeraParte'
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

      setProtagonista("");
      setLugar("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }

    // createImage
    try {
      const response = await fetch("/api/createImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `${protagonista} in ${lugar} retro art`,
        }),
      });

      const imageResponse = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      const img = imageResponse.imageURL;
      setImageURL(img)

    } catch (error) {
      console.error(error);
      alert(error.message);
    }


  }

  async function onSubmit2(opcion) {
    setDisableButton(true)
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          primeraParte: primeraParte,
          segundaParte: opcion,
          type: 'segundaParte'
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      const fin = data.result
      setFinal(fin)

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }
  // console.log('PROTAGONISTA: ', protagonista)
  // console.log('final: ', final)
  console.log('a:', A)
  console.log('b:', B)

  const reset = () => {
    setProtagonista("")
    setLugar("")
    setPrimeraParte("");
    setA();
    setB();
    setImageURL()
    setFinal()
    setDisabledInput()
    setDisableButton()
  }

  return (
    <div className="container">

      <main>
        <div className="inputContainer">
          <ProtagonistasList protagonista={protagonista} setProtagonista={setProtagonista} disabledInput={disabledInput} />
          <LugarList lugar={lugar} setLugar={setLugar} disabledInput={disabledInput} />
        </div>
        <Button disabled={!protagonista || !lugar} onClick={onSubmit}> Crea el cuento</Button>

        {(disabledInput && !primeraParte) ? <div><Hourglass size={32} style={{ margin: 40 }} /></div> : <div className="primaParte">{primeraParte}</div>}




        {(primeraParte && !imageURL) ? <div><Hourglass size={32} style={{ margin: 40 }} /></div> : <>
          <img src={imageURL} />
          <div className="buttonsContainer">
            {A && <Button disabled={disabledButton} size="xl" onClick={() => onSubmit2(A)}>{A}</Button>}
            {B && <Button disabled={disabledButton} size="xl" onClick={() => onSubmit2(B)}>{B}</Button>}
          </div>
        </>}


        {(disabledButton && !final) ? <div><Hourglass size={32} style={{ margin: 40 }} /></div> :
          <div className="primaParte">{final}</div>}
        {final && <div>
          <Button onClick={reset}>RESET</Button>
        </div>}
      </main>
    </div>
  );
}
