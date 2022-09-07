import {useReducer, useState} from "react";
import "./App.css";

function reducer({state}) {
    switch (state) {
        case "PRESSED_ONCE":
            return {
                state: "PRESSED_TWO"
            };
        case "PRESSED_TWO":
            return {
                state: "PRESSED_THREE"
            };
        case "PRESSED_THREE":
            return {
                state: "PRESSED_ONCE"
            };

        default:
            break;
    }
}

const Button = props => {
    const [counter, setCounter] = useState(0);

    const [state, dispatch] = useReducer(reducer, {
        state: "PRESSED_ONCE"
    });

    return (
        <div style={{color: props.color, textDecoration: props.underline ? "underline" : undefined}}>
            <div onClick={() => dispatch()}>sdfdsfsd</div>
            <div>{state.state}</div>
        </div>
    );
};

function App() {
    const [busy, setBusy] = useState(false);
    const props = {
        increment: 2,
        underline: true
    };

    return (
        <div className="App">
            <Button {...props} color="black" />
            <Button {...props} color="blue" />
            <Button {...props} underline={false} color="green" />
        </div>
    );
}

export default App;
