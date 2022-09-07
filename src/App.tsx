import {useEffect, useReducer, useState} from "react";
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

// *
// * idle
// * loading
// * loaded
// * error
// *

function App() {
    const [state, setState] = useState("idle");

    function handleClick() {
        setState("loading");
        fetch("/data.json")
            .then(data => {
                try {
                    // JSON.parse(data);
                    setState("loaded");
                } catch (error) {
                    setState("json-error");
                }
            })
            .catch(err => {
                setState("network-error");
            });
    }

    if (state === "loading") {
        return <div>Loading...</div>;
    }

    if (state === "network-error") {
        return <div>Error fething your request</div>;
    }

    if (state === "json-error") {
        return <div>Bad server response</div>;
    }
    return (
        <div className="App" onClick={handleClick}>
            Текущий стейт: {state}
        </div>
    );
}

export default App;
