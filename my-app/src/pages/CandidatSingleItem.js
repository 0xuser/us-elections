import React from 'react';
import CandidatSingle from '../components/CandidatSingle'

const CandidatSingleItem = ({location}) => {
    const props = location.aboutProps !== undefined ? location.aboutProps : ""
    
    return ( 
        
            <CandidatSingle id={props.id}
                            location={props.location}
                            name={props.name}
                            image={props.image}
                            desc={props.desc}
                            prevPath={props.prevPath}
                            path={props.path}
                            twitterName={props.twitter_name}
                            url={props.url}/>
        
    );
}
 
export default CandidatSingleItem;