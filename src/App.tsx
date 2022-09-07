import React, {useState} from "react";
import "./App.css";

const Checkbox = ({children}) => {
    const [checked, setChecked] = useState(true);
    console.log(checked);

    const allChildren = React.Children.map(children, child => {
        console.log(child);

        // можно вывести ошибку без рендеринга или вернуть null
        // при return null элементы будут просто игнорироваться (без ошибки в консоли)
        // if (typeof child.type === "string") {
        //     // throw new Error(`<${child.type}/> DOM element is not allowed inside <Checkbox /> component`);
        //     return null;
        // }

        // можно по-другому: проверка на соответствие только тем элементам, которые
        // там должны быть (белый список поддерживаемых элементов)

        if (child.type !== Label && child.type !== CheckboxInput) {
            throw new Error(`No custom element supported`);
        }

        const clone = React.cloneElement(child, {
            checked,
            setChecked
        });
        return clone;
    });

    return allChildren;
};
const CheckboxInput = ({checked, setChecked}) => {
    return (
        <input
            type="checkbox"
            checked={checked}
            onChange={e => {
                setChecked(e.target.checked);
            }}
        />
    );
};
const Label = ({setChecked, children}) => {
    return <label onClick={() => setChecked(prevState => !prevState)}>{children}</label>;
};

function App() {
    return (
        <Checkbox>
            <Label>Chekbox label</Label>
            <CheckboxInput />
        </Checkbox>
    );
}

export default App;
