import React from 'react'

class HomeLand extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentOne: 0,
            displayModal: false
        }
    }

    toggleModal = () => {
        this.setState((prevState) => ({
            displayModal: !prevState.displayModal
        }))
    }

    componentDidMount() {
        this.title()
    }

    title = () => {
        let chars = Array.from(document.querySelectorAll('.ui-char'))
        console.log(chars, 11)
        chars.forEach(items => {
            let value = items.innerHTML.split('')
            items.innerHTML=''
            let index = 0
            value.forEach(item => {
                index++
                let span = document.createElement('span')
                span.classList.add('chars')
                span.style.setProperty('--char_index', index)
                let text = document.createTextNode(item)
                span.appendChild(text)
                items.appendChild(span)
            })
        })
    }

    handleClickRight = () => {
        let chars = Array.from(document.querySelectorAll('.ui-char-splitting'))
        console.log(chars.length, 37)
        if (this.state.currentOne > chars.length - 2) {
            this.setState({
                currentOne: 0
            })
        } else {
            this.setState((prevState) => ({
                currentOne: prevState.currentOne + 1
            }))
        }
    }

    handleClickLeft = () => {
        let chars = Array.from(document.querySelectorAll('.ui-char-splitting'))
        console.log(chars.length)
        if (this.state.currentOne < 1) {
            this.setState({
                currentOne: chars.length - 1
            })
        } else {
            this.setState((prevState) => ({
                currentOne: prevState.currentOne - 1
            }))
        }
    }

    render(){
        const {currentOne, displayModal} = this.state
        return(
            <div>
                <button className={'btn btn-outline-primary'} onClick={this.toggleModal}>
                    Open Modal
                </button>
                {<div className={`${ 'ui-slider-modal'}`} data-modal={displayModal}>
                    <i className="fas fa-times" onClick={this.toggleModal}></i>
                    <div className={'ui-char-splitting'} data-active={currentOne === 0}>
                        <div className={'ui-char'} >
                            iGrid
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur est ipsa iste ratione velit. A architecto ex fugit odio possimus.</p>
                        <img src={process.env.PUBLIC_URL + '/media/image/1.jpg'} />
                    </div>
                    <div className={'ui-char-splitting'} data-active={currentOne === 1}>
                        <div className={'ui-char'} >
                            Penta
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur est ipsa iste ratione velit. A architecto ex fugit odio possimus.</p>
                        <img src={process.env.PUBLIC_URL + '/media/image/2.jpg'} />
                    </div>
                    <div className={'ui-char-splitting'} data-active={currentOne === 2}>
                        <div className={'ui-char'} >
                            Rakib
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur est ipsa iste ratione velit. A architecto ex fugit odio possimus.</p>
                        <img src={process.env.PUBLIC_URL + '/media/image/3.jpg'} />
                    </div>
                    <i className="fas fa-chevron-left" onClick={this.handleClickLeft}></i>
                    <i className="fas fa-chevron-right" onClick={this.handleClickRight}></i>
                </div>}
            </div>
        )
    }
}

export default HomeLand