import clsx from "clsx";
import Anchor from "../Anchor";
import "./style.scss";

type DefaultList = {
  _id: string | number;
  title: string;
  url: string;
};

type SidebarProps<T extends DefaultList> = {
  index: number;
  id: string | number;
  list: T[];
};

type SidebarItemProps = {
  title: string;
  url: string;
  active?: boolean;
  children?: SidebarItemProps[];
};

const SidebarItem = (props: SidebarItemProps) => {
  const { title, url, active, children } = props;

  return (
    <>
      <Anchor href={url} className={clsx({ active })}>
        {title}
      </Anchor>
      {children && children.length > 0 && (
        <ul>
          {children.map((childItem, index) => (
            <li key={index}>
              <SidebarItem {...childItem} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

const Sidebar = <T extends DefaultList>({ id, list }: SidebarProps<T>) => {
  return (
    <div className="sidebar">
      <ul>
        {list.map(({ _id, title, url }) => (
          <li key={_id}>
            <SidebarItem active={_id === id} title={title} url={url} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
