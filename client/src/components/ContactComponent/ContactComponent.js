import React, {Component} from 'react';

class ContactComponent extends Component {
    render() {
        return (
            <div className={'grid-55-45 h-100 bg-white rounded'}>
                <div className={'ui-contact justify-content-center align-items-center'}>
                    <h1 className={'text-center mb-5 text-white'}>Contact with <b>iGrid</b><br/> service team</h1>
                    <img src={process.env.PUBLIC_URL + '/media/image/contact.png'} alt="contact"/>
                </div>
                <div className={'p-4'}>
                    <div className="mb-2">
                        <label className={'ui-custom-label'}>Your Name</label>
                        <input type="text" className={'ui-custom-input'} placeholder={'Your Name'}/>
                    </div>
                    <div className="mb-2">
                        <label className={'ui-custom-label'}>Your Name</label>
                        <input type="text" className={'ui-custom-input'} placeholder={'Your Name'}/>
                    </div>
                    <div className="mb-2">
                        <label className={'ui-custom-label'}>Your Name</label>
                        <input type="text" className={'ui-custom-input'} placeholder={'Your Name'}/>
                    </div>
                    <div className="mb-2">
                        <label className={'ui-custom-label'}>Your Name</label>
                        <input type="text" className={'ui-custom-input'} placeholder={'Your Name'}/>
                    </div>
                    <div className="mb-2">
                        <label className={'ui-custom-label'}>Your Name</label>
                        <select className={'ui-custom-input'} placeholder={'Your Name'}>
                            <option>Select Subject</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <label className={'ui-custom-label'}>Write Message</label>
                        <textarea name="" className={'ui-custom-textarea'} placeholder={'Write Message'} />
                    </div>
                    <div>
                        <button className={'w-100 btn-message'}>Send Message</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContactComponent;