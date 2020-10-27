import React from 'react';
import * as T from 'prop-types';

import PrivatePage from '../Form/Users/PrivatePage';
import LayoutTemplate from './LayoutTemplate';

const UserLayoutTemplate = ({children}) => (
  <PrivatePage>
    <LayoutTemplate>
      {
        children
      }
    </LayoutTemplate>
  </PrivatePage>
);

UserLayoutTemplate.protoTypes = {
  classes: T.object,
}

export default UserLayoutTemplate;