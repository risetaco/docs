import Anchor from "../Anchor";
import { LeftArrowIcon, RightArrowIcon } from "../Icon";
import "./style.scss";

type DefaultList = {
  _id: string | number;
  title: string;
  url: string;
};

type NavLinkProps<T extends DefaultList> = {
  index: number;
  id: string | number;
  list: T[];
};

const NavLink = <T extends DefaultList>({
  index,
  list,
  id,
}: NavLinkProps<T>) => {
  const idx = list.findIndex((item) => item._id === id);
  let prev = list[idx - 1];
  let next = list[idx + 1];

  console.log({ prev, next, index, list });

  return (
    <div className="nav-link">
      {prev && (
        <Anchor href={prev.url} className="prev">
          <LeftArrowIcon />
          <span>{prev.title}</span>
        </Anchor>
      )}
      {next && (
        <Anchor href={next.url} className="next">
          <span>{next.title}</span>
          <RightArrowIcon />
        </Anchor>
      )}
    </div>
  );
};

export default NavLink;
