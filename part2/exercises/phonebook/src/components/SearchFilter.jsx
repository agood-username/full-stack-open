const SearchFilter = ({query, handleQueryChange}) => (
        <div>
            filter shown with <input value={query} onChange={handleQueryChange} />
        </div>
)

export default SearchFilter