import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { PackageIcon } from "../Icon";
import "./style.scss";

type SearchInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const SearchInput = (props: SearchInputProps) => {
  return (
    <div className="search-bar-wrapper">
      <div className="search-bar">
        <PackageIcon className="prefix" />
        <input placeholder="Search" {...props} />
        <button>Search</button>
      </div>
    </div>
  );
};

export type { SearchInputProps };
export default SearchInput;
