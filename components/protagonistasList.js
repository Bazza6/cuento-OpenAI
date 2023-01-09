import protagonistas from "../protagonista.json"

export default function ProtagonistasList() {

    const list = protagonistas.map(p => {
        return (
            <div>
                <input type="radio" id={p.prompt} name={p.prompt} value={p.prompt} />
                <label htmlFor={p.prompt}>{p.name}</label>
            </div>
        )
    }
    )

    console.log(protagonistas)

    return (
        <fieldset>
            <legend>Elije tu protagonista:</legend>

            {list}
        </fieldset>
    )

}