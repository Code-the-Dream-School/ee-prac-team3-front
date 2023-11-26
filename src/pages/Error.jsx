import React from 'react';
import { HOME } from 'App';
import { Link } from '@mui/material';

export default function Error() {
  return (
    <div>
      Error 404 :(
      <Link href={HOME}>Go to home page</Link>)
    </div>
  );
}
