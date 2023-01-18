import { useState } from "react";
import { GroupBox, Select, SelectNative } from "react95";


export default function ToggleDark() {
    // const [dark, setDark] = useState('')

    const options = [{ value: 'light', label: 'LIGHT 💡' }, { value: 'dark', label: 'DARK' }]

    const handleTypeSelect = e => {
        setDark(e.value);
    };

    return (
        <div id='default-selects'>
            <Select
                // defaultValue={1}
                options={options}
                menuMaxHeight={160}
                width={160}
                onChange={handleTypeSelect}


                onOpen={e => console.log('open', e)}
                onClose={e => console.log('close', e)}
                onBlur={e => console.log('blur', e)}
                onFocus={e => console.log('focus', e)}
            />


        </div>
    )
}
