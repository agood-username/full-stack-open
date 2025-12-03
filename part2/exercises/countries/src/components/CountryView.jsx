const CountryView = ({ country }) => {
    const {name, capital, area} = country
    const languages = Object.values(country.languages)
    const flagPng = country.flags.png

    return <div>
        <h2>{name.common}</h2>

        <p>Capital {capital}</p>
        <p>Area {area}</p>
        <h2>Languages</h2>
        <ul>
            {languages.map((lang, index) => (
                <li key={index}>{lang}</li>
            ))}
        </ul>
        <img src={flagPng} alt={`Flag of ${name}`} />
    </div>
}

export default CountryView