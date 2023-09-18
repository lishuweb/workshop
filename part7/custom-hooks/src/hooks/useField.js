import { useState } from "react";

const useField = (type) => {
    const [value, setValue] = useState("");

    const onChange = () => {
        setValue(event.target.value);
    }

    return {
        type,
        value,
        onChange
    };
};

export default useField;