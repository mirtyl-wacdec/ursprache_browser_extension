import * as React from "react";
import { FC } from 'react';

interface SavedProps {
    url: string,
    reset: () => void
}

const Saved = (props: SavedProps) => {
    return (
        <div className="saved">
            <p>Your instance is {props.url}</p>
            <button onClick={props.reset}>Change?</button>
        </div>
    )
}

export default Saved;