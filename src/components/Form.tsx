import * as React from "react";

interface FormProps {
    url: string,
    error: string,
    setUrl: (string: string) => void,
    handleClick: (event: React.MouseEvent<Element, MouseEvent>) => Promise<any>
}

const Form = ({url, error, setUrl, handleClick}: FormProps) => {
    return (
        <div className="form">
            <label htmlFor="url">URL</label>
            <input onChange={e => setUrl(e.target.value)} value={url} name="url" type="text" autoComplete="off" />
            <button onClick={handleClick}>Save</button>
            <p>{error}</p>
        </div>
    )
}

export default Form;