import PostHeader from './PostHeader';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import classes from './PostContent.module.css';

const PostContent = ({ post }) => {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customRenderers = {
    image: ({ src, alt }) => {
      return <Image src={`/images/posts/${post.slug}/${src}`} alt={alt} width={600} height={300} />;
    },
    paragraph: ({ node, children }) => {
      if (node.children[0].type === 'image') {
        const image = node.children[0];

        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.url}`}
              alt={image.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }

      return <p>{children}</p>;
    },

    code: ({ language, value }) => {
      return <SyntaxHighlighter style={atomDark} language={language} children={value} />;
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />

      <ReactMarkdown renderers={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
