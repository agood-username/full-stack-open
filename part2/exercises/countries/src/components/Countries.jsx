import { useState } from "react"

import CountryView from "./CountryView"

const Countries = ({ countries }) => {
    const [isShowing, setIsShowing] = useState(false)
    const [country, setCountry] = useState(null)

    if (!countries) return null

    const handleShow = (country) => {
        setIsShowing(true)
        setCountry(country)
    }

    const handleClose = () => {
        setIsShowing(false)
        setCountry(null)
    }

    return (
        <div>
            {isShowing ? (
                <>
                    <button onClick={handleClose}>close</button>
                    <CountryView country={country} />
                </>
            ) : (
                <>
                    {countries?.map(country => (
                        <p key={country.cca3}>{country.name.common} <button onClick={() => handleShow(country)}>show</button></p>
                    ))}
                </>
            )}  
        </div>
    )
}

export default Countries