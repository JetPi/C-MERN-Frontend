import React from 'react';
import fetchHandler from '../../shared/util/fetcher';

import UsersList from '../components/UsersList';

async function Users() {
  const response = await fetchHandler({
    url: "/users/"
  })
  

  return <UsersList items={""} />;
};

export default Users;
