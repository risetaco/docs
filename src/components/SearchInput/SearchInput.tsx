import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
  cloneElement,
  forwardRef,
} from "react";
import "./style.scss";

type SearchInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  icon?: ReactNode;
  block?: boolean;
};

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ block, icon, ...rest }, ref) => {
    return (
      <div className="search-bar-wrapper">
        <div className="search-bar" style={{ width: block ? "100%" : "" }}>
          {cloneElement(icon as ReactElement, { className: "prefix" })}
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
