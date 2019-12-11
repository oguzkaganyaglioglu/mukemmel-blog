import React from 'react';

const Slogan = () => (
    <div>
        <div className="Slogan">
            <h5 className="changedword" id="make">make</h5>
            <h5 className="changedword" id="think">think</h5>
            <h5 className="changedword" id="sentence">sentence</h5>



        </div>
    
    <style jsx>{`
    .changedword{
           
        text-align: center;
    }

    #make{
       // animation: kelime1 2.5s infinite 0s ease-in-out;
    }

    #think{
       // animation: kelime2 2.5s infinite 0s ease-in-out;
    }
    @keyframes kelime1{
        0%{
            transform: translateX(-100px);
            opacity: 0;
            }
        12%{
            transform: translateX(0px);
            opacity: 1;
            }
        37%{
            transform: translateX(0px);
            opacity: 1;
            }
        49%{
            transform: translateX(0px) translateY(-25px);
            opacity: 0;
            }
        50%{
            transform: translateX(0px) translateY(-25px);
            opacity: 0;
            }
        100%{
            transform: translateX(0px) translateY(-25px);
            opacity: 0;
            }
    }

    @keyframes kelime2{
        0%{
            transform: translateX(-100px) translateY(0px);
            opacity: 0;
            }
        37%{
            transform: translateY(25px);
            opacity: 0;
            }
        49%{
            transform: translateX(0px);
            opacity: 1;
            }
        88%{
            transform: translateX(0px);
            opacity: 1;
            }
        100%{
            transform: translateX(0px) translateY(-25px);
            opacity: 0;
            }
    }
    `}</style>

</div>
)

export default Slogan
