import React, {useState} from 'react'
import './flash_message.css'

const FlashMessage = (props) => {
    const [state, setState] = useState({

    })
    return(
        <div className={'ui-flash-message-container'}>
            <div className="ui-flesh-message">
                <b>Something went wrong</b>
            </div>
        </div>
    )
}

export default FlashMessage