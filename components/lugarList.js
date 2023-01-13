import { GroupBox, Radio, Window, WindowContent } from "react95";

import ambientacion from "../ambientacion.json"

export default function LugarList({ lugar, setLugar }) {

    function onChangeValue(event) {
        setLugar(event.target.value);
        console.log('Lugar:', event.target.value);
    }
    const handleChange = e => {
        setProtagonista(e.target.value); (e.target.value);
    }


    const list = ambientacion.map((p, index) => {

        return (

            <div key={index}>

                {/* <div key={index}>
                <input type="radio" id={p.prompt} name='ambientacion' value={p.prompt} />
                <label htmlFor={p.prompt}>{p.name}</label>
            </div> */}

                < Radio
                    checked={p.prompt === lugar}
                    value={p.prompt}
                    name='radio'
                    id={p.prompt}
                    type="radio"
                    label={p.name}
                    onchange={handleChange}
                />
            </div >
        )
    }
    )


    return (
        <Window>
            <WindowContent>

                <GroupBox label='ambientacion' >

                    <div onChange={onChangeValue}>
                        {list}
                    </div>
                </GroupBox>

            </WindowContent>
        </Window>
    )

}