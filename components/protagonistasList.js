import protagonistas from "../protagonista.json"

export default function ProtagonistasList({ setProtagonista }) {

    function onChangeValue(event) {
        setProtagonista(event.target.value);
        console.log('Protagonista:', event.target.value);
    }

    const list = protagonistas.map((p, index) => {
        return (
            <div key={index}>
                <input type="radio" id={p.prompt} name='radio' value={p.prompt} />
                <label htmlFor={p.prompt}>{p.name}</label>
            </div>
        )
    }
    )


    return (
        <fieldset>
            <legend>Elije tu protagonista:</legend>

            <div onChange={onChangeValue}>
                {list}
            </div>
        </fieldset>
    )

}