import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search users...",
}) => {
  return (
    <div className="relative w-72">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-9 pl-8 pr-3 text-sm bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-[#EF5157] focus:border-[#EF5157] placeholder-gray-400 text-gray-900 transition-colors duration-200"
        placeholder={placeholder}
      />
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default SearchBar;
