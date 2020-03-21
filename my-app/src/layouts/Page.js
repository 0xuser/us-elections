import React from 'react';
import {Route, Switch} from 'react-router-dom'
import '../sass/Main.sass'

import DescribePage from '../pages/DescribePage';
import TagsPage from '../pages/TagsPages'
import UsersPage from '../pages/UsersPage'
import OtherPage from '../pages/OtherPage'
import ErrorPage from '../pages/ErrorPage'

const Page = (props) => {
    return ( 
        <>
        <Switch>
            <Route path="/" exact component={() => <DescribePage data={props.data}/>} />
            <Route path="/tags" component={() => <TagsPage data={props.data}/>} />
            <Route path="/users"  component={() => <UsersPage data={props.data}/>} />
            <Route path="/other"  component={() => <OtherPage data={props.data}/>} />
            <Route component={ErrorPage} />
        </Switch>
        </>
     );
}
 
export default Page;