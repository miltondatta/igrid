import React from "react";

export default () => {
    return <>
        <img src={process.env.PUBLIC_URL + '/media/image/spinner.gif'}
             style={{width: '100px', margin: 'auto', display: 'block'}} alt="Loading..."/>
    </>;
}