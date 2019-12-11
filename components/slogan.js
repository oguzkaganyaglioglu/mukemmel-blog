import React from 'react';
import Typical from "react-typical"

const Slogan = () => (
    <div>
        <h4 className="lead">
            <Typical
            steps={['Think it better',
                    1000,
                    'Make it better!',
                    1500
            ]}
            loop={Infinity}
            wrapper="p"
            />
        </h4>
</div>
)

export default Slogan
