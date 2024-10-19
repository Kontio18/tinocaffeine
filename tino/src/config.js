import React from 'react';
const backendProtocol = process.env.REACT_APP_BACKEND_PRTCL;
const backendServer = process.env.REACT_APP_BACKEND_SERVER;
const backendPort = process.env.REACT_APP_BACKEND_PORT;
const backendUrl = `${backendProtocol}${backendServer}${backendPort}`;

export {
    backendProtocol,
    backendServer,
    backendPort,
    backendUrl
};


