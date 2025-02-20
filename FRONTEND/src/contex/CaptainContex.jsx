import React ,{createContext , useState , useContext} from 'react'


export const CaptainDataContex = createContext()


const CaptainContex = ({children}) => {

    const [captain , setCaptain] = useState(null);
    const [isLoading , setIsLoading] = useState(false) ;
    const [error , setError] = useState(null) ;

    const updateCaptain = (captainData) => {
        setCaptain(captainData)
    }

    const value = {
        captain ,
        setCaptain ,
        isLoading ,
        setIsLoading,
        error,
        updateCaptain,
        setError
    }



      return (
    <CaptainDataContex.Provider value={value}>
        {children}
    </CaptainDataContex.Provider>
  )
}

export default CaptainContex
