import React from 'react'

const UrlContext = React.createContext(process.env.REACT_APP_URL + "/api")

export default UrlContext;