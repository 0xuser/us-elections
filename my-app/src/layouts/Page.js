import React from 'react';
import {Route, Switch} from 'react-router-dom'
import '../sass/Main.sass'

import CandidatSingleItem from '../pages/CandidatSingleItem.js'
import CandidatsPage from '../pages/CandidatsPage';
import SummaryPage from '../pages/SummaryPage'
import OverallPage from '../pages/OverallPage'
import SearchPage from '../pages/SearchPage'
import ErrorPage from '../pages/ErrorPage'

const Page = (props) => {
    return ( 
        <>
            <Switch>
                <Route path="/" exact component={() => <CandidatsPage path={props.path}/>} />
                <Route path="/candidat/:id" component={CandidatSingleItem} />
                <Route path="/summary" component={() => <SummaryPage path={props.path} />} />
                <Route path="/search"  component={() => <SearchPage path={props.path} />} />
                <Route path="/overall"  component={() => <OverallPage path={props.path} />} />
                <Route component={ErrorPage} />
            </Switch>
        </>
     );
}
 
export default Page;