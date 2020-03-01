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
                    All the stories that describe about our size and diversity, as remarkable and significant as they may be, are secondary to the truest measure of Penta Global: The impact we make to the people & the business. Despite of short tenure of establishment (July, 2013), Penta Global imparted more than 20+ years of skilled resources, long-term proven reliability and investment protection, as well as its many certified IT security standards which helps Penta Global to be the trustworthy company to across the industry.

                    <br/><br/> 
                    People may ask, “Why the Penta Global is different?” and the answer resides in the many specific cases of where we have helped our partners and people to achieve remarkable goals, solve complex problems, or make meaningful progress with trust. In deeper still, it’s in the beliefs, behaviors, and fundamental sense of purpose that underpin all that we do.
                    </p>
                </div>
            </div>
        );
    }
}

export default AboutComponent;