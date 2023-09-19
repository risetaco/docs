import SearchInput, { SearchInputProps } from "@/components/SearchInput";
import "./style.scss";

type HeroProps = {
  title: string;
  subtitle: string;
  search?: null | SearchInputProps;
};

const Hero = ({ title, subtitle, search }: HeroProps) => {
  return (
    <div className="hero-wrapper">
      <div className="hero">
        <div className="content">
          <div className="title">{title}</div>
          <p className="subtitle">{subtitle}</p>
          {search ? <SearchInput {...search} /> : null}
        </div>
      </div>
    </div>
  );
};

export default Hero;
