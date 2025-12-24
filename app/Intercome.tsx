"use client"

import React from 'react';
import Intercom from '@intercom/messenger-js-sdk';

export default function Component() {
  Intercom({
    app_id: 'l5tf7cnw',
  });

  return <div>Example App</div>;
}