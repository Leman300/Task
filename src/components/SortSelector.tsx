import React from "react"

interface SortOption {
  label: string
  value: string
}

interface SortSelectorProps {
  options: SortOption[]
  selectedField: string
  selectedDirection: "asc" | "desc"
  onChange: (field: string, direction: "asc" | "desc") => void
}

const SortSelector: React.FC<SortSelectorProps> = ({
  options,
  selectedField,
  selectedDirection,
  onChange,
}) => {
  return (
    <div id="state">
      <select
        className="px-3 py-2 mr-2 border border-gray-300 rounded-md focus:outline-none"
        value={selectedField}
        onChange={(e) => onChange(e.target.value, selectedDirection)}
        aria-labelledby="state"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <select
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
        value={selectedDirection}
        onChange={(e) =>
          onChange(selectedField, e.target.value as "asc" | "desc")
        }
        aria-labelledby="state"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  )
}

export default SortSelector
