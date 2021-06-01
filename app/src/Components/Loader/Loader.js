import {BounceLoader} from "react-spinners";
import React from "react";
import './Loader.css'
import {css} from "@emotion/react";

const loaderStyle = css`display: inline-block;`;

function Loader() {
    return (
        <div className="loader">
            <BounceLoader
                size={30}
                color={'#364cbc'}
                css={loaderStyle} />
            <p>Loading</p>
        </div>
    )
}

export default Loader;
