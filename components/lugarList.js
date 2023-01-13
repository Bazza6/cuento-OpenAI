import ambientacion from "../ambientacion.json"

export default function LugarList({ setLugar }) {

    function onChangeValue(event) {
        setLugar(event.target.value);
        console.log('Lugar:', event.target.value);
    }

    const list = ambientacion.map((p, index) => {
        return (
            <div key={index}>
                <input type="radio" id={p.prompt} name='ambientacion' value={p.prompt} />
                <label htmlFor={p.prompt}>{p.name}</label>
            </div>
        )
    }
    )


    return (
        <fieldset>
            <legend>Elije tu ambientacion:</legend>

            <div onChange={onChangeValue}>
                {list}
            </div>
        </fieldset>
    )

}