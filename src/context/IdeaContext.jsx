import React from 'react'
export const IdeaContext = React.createContext()


export const IdeaProvider = ({ children }) => {


    return (
        <IdeaContext.Provider value={{}}>
            {children}
        </IdeaContext.Provider>
    )
}