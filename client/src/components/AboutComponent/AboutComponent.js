import React, {Component} from 'react';

class AboutComponent extends Component {
    render() {
        return (
            <div className={'grid-55-45 h-100 bg-white rounded'}>
                <div className={'ui-about'}>
                    <img src={process.env.PUBLIC_URL + '/media/image/about.png'} alt="Register"/>
                </div>
                <div className={'p-4'}>
                    <h1>About <b>iGrid</b></h1>
                    <p className={'text-justify line-h-35px '}>
                        What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown
                        printer took a galley of type and scrambled it to make a type specimen book it has What is Lorem
                        Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has
                        been the industry's standard dummy text ever since the 1500s when an unknown printer took a
                        galley of type and scrambled it to make a type specimen book it has What is Lorem Ipsum Lorem
                        Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s when an unknown printer took a galley of
                        type and scrambled it to make a type specimen book it has What is Lorem Ipsum Lorem Ipsum is
                        simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500s when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book it has What is Lorem Ipsum Lorem Ipsum is simply dummy
                        text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy
                        text ever since the 1500s when an unknown printer took a galley of type and scrambled it to maketype
                        specimen book it has What is Lorem Ipsum Lorem Ipsum is simply dummy the industry's standard dummy
                        text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make
                    </p>
                </div>
            </div>
        );
    }
}

export default AboutComponent;