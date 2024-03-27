import { useState } from "react"

interface SearchFormProps {
  onSearch: (value: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {

  const [value, setValue] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setValue(searchValue);
    onSearch(searchValue);
  }

  return (
    <>
      <div className="text-cyan-300 text-sm font-bold">Users</div>
      <div className="search-inner p-1">
      <input
            type="text"
            placeholder="search"
            className="w-[90%] h-8 rounded-md px-2"
            value={value}
            onChange={onChange}
        />
      </div>
    </>

  )
}

export default SearchForm