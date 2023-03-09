import { useState } from "react";
import { Button, Hourglass } from "react95";
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
  const [disableCrearButton, setDisableCrearButton] = useState(false)
  const [disabledInput, setDisabledInput] = useState(false)
  const [disabledButton, setDisableButton] = useState(false)
  const [activeButton, setActiveButton] = useState("")

  async function onSubmit(event) {
    setDisableCrearButton(true)
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
          prompt: `${protagonista} en ${lugar}. Retro art`,
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

      if (response.status !== 200) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();
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
    setDisableCrearButton(false)
    setPrimeraParte("");
    setA();
    setB();
    setImageURL()
    setFinal()
    setDisabledInput()
    setDisableButton()
  }

  const onClickA = () => {
    onSubmit2(A)
    setActiveButton("A")
  }
  
  const onClickB = () => {
    onSubmit2(B)
    setActiveButton("B")
  }

  // console.log('A: ', A)
  // console.log('A: ', A)
  // console.log('lugar: ', lugar)
  // console.log('protagonista: ', protagonista)
  // console.log('primeraParte: ', primeraParte)
  // console.log('imageURL: ', imageURL)


  return (
    <div className="container">
      <main>
        <div className="inputContainer">
          <ProtagonistasList protagonista={protagonista} setProtagonista={setProtagonista} disabledInput={disabledInput} />
          <LugarList lugar={lugar} setLugar={setLugar} disabledInput={disabledInput} />
        </div>
        <Button disabled={disableCrearButton || !(lugar && protagonista)} onClick={onSubmit}> Crea el cuento</Button>

        {(disabledInput && !primeraParte) ? <div><Hourglass size={32} style={{ margin: 40 }} /></div> : <div className="primaParte">{primeraParte}</div>}

        {(primeraParte && !imageURL) ? <div><Hourglass size={32} style={{ margin: 40 }} /></div> : <>
          <img className="img" src={imageURL} />
          <div className="buttonsContainer">
            {A && <Button active={activeButton === "A"} disabled={activeButton === "B"} size="xl" onClick={onClickA}>{A}</Button>}
            {B && <Button active={activeButton === "B"} disabled={activeButton === "A"} size="xl" onClick={onClickB}>{B}</Button>}
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
