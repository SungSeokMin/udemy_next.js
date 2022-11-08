import { Fragment } from 'react';
import { getAllPosts } from '../../lib/posts-util';

import Head from 'next/head';
import AllPosts from '../../components/posts/AllPosts';

const AllPostsPage = ({ posts }) => {
  return (
    <Fragment>
      <Head>
        <title>All My Posts</title>
        <meta name="description" content="전체 게시글" />
      </Head>
      <AllPosts posts={posts} />;
    </Fragment>
  );
};

export const getStaticProps = () => {
  const posts = getAllPosts();

  return {
    props: { posts },
  };
};

export default AllPostsPage;
