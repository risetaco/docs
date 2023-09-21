import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react";
import { PackageIcon } from "../Icon";
import "./style.scss";

type SearchInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  block?: boolean;
};

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ block, ...rest }, ref) => {
    return (
      <div className="search-bar-wrapper">
        <div className="search-bar" style={{ width: block ? "100%" : "" }}>
          <PackageIcon className="prefix" />
          <input placeholder="Search" ref={ref} {...rest} />
          <button>Search</button>
        </div>
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export type { SearchInputProps };
export default SearchInput;
