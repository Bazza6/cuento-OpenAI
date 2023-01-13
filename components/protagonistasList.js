import { GroupBox, Radio, Window, WindowContent } from "react95";
import protagonistas from "../protagonista.json"

export default function ProtagonistasList({ protagonista, setProtagonista, disabledInput }) {

    function onChangeValue(event) {
        setProtagonista(event.target.value);
        console.log('Protagonista:', event.target.value);
    }
    const handleChange = e => {
        setProtagonista(e.target.value); (e.target.value);
    }

    const list = protagonistas.map((p, index) => {


        return (
            <div key={index}>
                {/* <input type="radio" id={p.prompt} name='radio' value={p.prompt} />
                <label htmlFor={p.prompt}>{p.name}</label> */}

                <Radio
                    checked={p.prompt === protagonista}
                    value={p.prompt}
                    name='radio'
                    id={p.prompt}
                    type="radio"
                    label={p.name}
                    onchange={handleChange}
                    disabled={disabledInput}
                />
            </div>
        )
    }
    )


    return (
        <Window>
            <WindowContent>

                <GroupBox label='protagonista' >

                    <div onChange={onChangeValue}>
                        {list}
                    </div>
                </GroupBox>

            </WindowContent>
        </Window>
    )

}