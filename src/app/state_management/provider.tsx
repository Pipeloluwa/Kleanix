"use client";
import React from 'react'
import { Store } from './stores/store'
import { Provider } from 'react-redux';

const StateProvider = ({children}: {children:React.ReactNode;})=> {
  return (
    <Provider store={Store}>
      {children}
    </Provider>
  )
}

export default StateProvider;