import { GroupBox, Radio, Window, WindowContent } from "react95";

import ambientacion from "../ambientacion.json"

export default function LugarList({ lugar, setLugar, disabledInput }) {

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
                < Radio
                    checked={p.prompt === lugar}
                    value={p.prompt}
                    name='ambientacion'
                    id={p.prompt}
                    type="radio"
                    label={p.name}
                    onchange={handleChange}
                    disabled={disabledInput && p.prompt !== lugar}
                />
            </div >
        )
    }
    )


    return (
        <Window>
            <WindowContent>

                <GroupBox label='Ambientación' >

                    <div onChange={onChangeValue}>
                        {list}
                    </div>
                </GroupBox>

            </WindowContent>
        </Window>
    )

}
