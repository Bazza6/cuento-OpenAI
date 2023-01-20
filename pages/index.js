import { useState } from "react";
import { Button, Frame, Hourglass } from "react95";
import ProtagonistasList from "../components/protagonistasList";
import LugarList from "../components/lugarList";

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
      console.log('parts:', parts)
      let partsLength = parts.length
      for (let i = 0; i < partsLength; i++)
        if (parts[i].includes('1.')) {
          setPrimeraParte(parts[i].replace("1.", ""))
        } else if (parts[i].includes("2. Opción A: ")) {
          setA(parts[i].replace("2. Opción A: ", ""))
        } else if (parts[i].includes("2.Opción A: ")) {
          setA(parts[i].replace("2.Opción A: ", ""))
        } else if (parts[i].includes("3. Opción B: ")) {
          setB(parts[i].replace("3. Opción B: ", ""))
        } else if (parts[i].includes("3.Opción B: ")) {
          setB(parts[i].replace("3.Opción B: ", ""))
        }

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
          <img className="img" src={imageURL} />
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
