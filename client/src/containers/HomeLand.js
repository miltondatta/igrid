import React from 'react'

const HomeLand = () => {
    return(
        <div>
            <h4>Hi, welcome back!</h4>
            <svg viewBox="0 0 500 500">
                <path id="curve" strokeWidth={2} stroke={'red'} fill={'transparent'} d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97" />
                <text width="10">
                    <textPath alignmentBaseline="top" xlinkHref="#curve">
                        Dangerous Curves Ahead
                    </textPath>
                </text>
            </svg>
        </div>
    )
}

export default HomeLand