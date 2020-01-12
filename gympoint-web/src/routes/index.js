import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Students from '~/pages/Students';
import StudentDetails from '~/pages/Students/StudentDetails';

import Plans from '~/pages/Plans';
import PlanDetails from '~/pages/Plans/PlanDetails';

import Registrations from '~/pages/Registrations';
import RegistrationDetails from '~/pages/Registrations/RegistrationDetails';
import RegistrationNew from '~/pages/Registrations/RegistrationNew';

import HelpOrders from '~/pages/HelpOrders';

export default function Routes() {
   return (
      <Switch>
         <Route path="/" exact component={SignIn} />

         <Route
            path="/students/details"
            exact
            component={StudentDetails}
            isPrivate
         />
         <Route
            path="/students/details/:id"
            exact
            component={StudentDetails}
            isPrivate
         />
         <Route path="/students" component={Students} isPrivate />

         <Route path="/plans/details" exact component={PlanDetails} isPrivate />
         <Route
            path="/plans/details/:id"
            exact
            component={PlanDetails}
            isPrivate
         />
         <Route path="/plans" component={Plans} isPrivate />

         <Route
            path="/registrations/details"
            exact
            component={RegistrationNew}
            isPrivate
         />
         <Route
            path="/registrations/details/:id"
            exact
            component={RegistrationDetails}
            isPrivate
         />
         <Route path="/registrations" component={Registrations} isPrivate />

         <Route path="/help-orders" component={HelpOrders} isPrivate />

         <Route path="/" component={() => <h1>404</h1>} />
      </Switch>
   );
}
