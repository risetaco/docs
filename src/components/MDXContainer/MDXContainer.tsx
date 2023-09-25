import { useMDXComponent } from "next-contentlayer/hooks";
import { HeadingLink } from "./shorcodes";

const MDXContainer = (props: { code: string }) => {
  const { code } = props;
  const MDXContent = useMDXComponent(code);

  const context = { index: 0 };

  return (
    <article className="markdown-body">
      <MDXContent
        components={{
          h1: (props) => <HeadingLink context={context} tag="h1" {...props} />,
          h2: (props) => <HeadingLink context={context} tag="h2" {...props} />,
          h3: (props) => <HeadingLink context={context} tag="h3" {...props} />,
          h4: (props) => <HeadingLink context={context} tag="h4" {...props} />,
          h5: (props) => <HeadingLink context={context} tag="h5" {...props} />,
          h6: (props) => <HeadingLink context={context} tag="h6" {...props} />,
        }}
      />
    </article>
  );
};

export default MDXContainer;
