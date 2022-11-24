import 'core-js'
import React from 'react'
import { hydrateRoot } from "react-dom/client";
// eslint-disable-next-line import/no-extraneous-dependencies
import App from './App'

hydrateRoot(document, <App />);
