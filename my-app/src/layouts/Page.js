import React from 'react';
import {Route, Switch} from 'react-router-dom'
import '../sass/Main.sass'

import CandidatsPage from '../pages/CandidatsPage';
import SummaryPage from '../pages/SummaryPage'
import OverallPage from '../pages/OverallPage'
import SearchPage from '../pages/SearchPage'
import ErrorPage from '../pages/ErrorPage'

const Page = (props) => {
    return ( 
        <>
        <Switch>
            <Route path="/" exact component={CandidatsPage} />
            
            <Route path="/summary" component={SummaryPage} />
            <Route path="/search"  component={SearchPage} />
            <Route path="/overall"  component={OverallPage} />
            <Route component={ErrorPage} />
        </Switch>
        </>
     );
}
 
export default Page;