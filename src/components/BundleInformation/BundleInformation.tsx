import { ReactNode } from "react";
import Link from "next/link";
import { ClockIcon, LinkIcon, PackageIcon } from "../Icon";
import "./style.scss";

type ItemProps = {
  title: string;
  icon?: ReactNode;
  value?: ReactNode;
};

type BundleinformationProps = {
  packageName?: string;
  version: string;
  bundleSize?: string;
  downloadTime?: string;
};

const Item = ({ title, icon, value }: ItemProps) => {
  return (
    <div>
      <div>{title}</div>
      <div className="bundle-information--item-value">
        {icon}
        {value || "-"}
      </div>
    </div>
  );
};

const Bundleinformation = ({
  packageName,
  version,
  bundleSize,
  downloadTime,
}: BundleinformationProps) => {
  return (
    <div className="bundle-information">
      <Item title="Version" value={version} />
      <Item title="Bundle Size" icon={<PackageIcon />} value={bundleSize} />
      <Item title="Download Time" icon={<ClockIcon />} value={downloadTime} />
      <Item
        title="Package Link"
        icon={<LinkIcon />}
        value={
          packageName && (
            <Link
              target="_blank"
              href={`https://npm.shopee.io/-/web/detail/${packageName}`}
            >
              NPM Link
            </Link>
          )
        }
      />
    </div>
  );
};

export default Bundleinformation;
