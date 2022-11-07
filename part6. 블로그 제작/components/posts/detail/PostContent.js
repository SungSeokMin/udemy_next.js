import ReactMarkdown from 'react-markdown';
import PostHeader from './PostHeader';

import classes from './PostContent.module.css';

const DUMMY_POST = {
  slug: 'getting-started-with-nextjs',
  title: 'Getting Started with NextJS',
  image: 'getting-started-nextjs.png',
  date: '2022-11-07',
  content: '# This is a first post',
};

const PostContent = () => {
  const imagePath = `/images/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`;

  return (
    <article className={classes.content}>
      <PostHeader title={DUMMY_POST.title} image={imagePath} />

      <ReactMarkdown>{DUMMY_POST.content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
