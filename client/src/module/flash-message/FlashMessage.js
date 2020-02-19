import React, {useState} from 'react'
import './flash_message.css'

const FlashMessage = (props) => {
    const {errMsg} = props
    return(
        <div className={'ui-flash-message-container'}>
            <div className="ui-flesh-message">
                <b>{errMsg}</b>
            </div>
        </div>
    )
}

export default FlashMessage