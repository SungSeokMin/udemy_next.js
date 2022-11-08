import { Fragment } from 'react';
import { getFeaturedPosts } from '../lib/posts-util';

import Head from 'next/head';

import Hero from '../components/home-page/Hero';
import FeaturedPosts from '../components/home-page/FeaturedPosts';

const HomePage = ({ posts }) => {
  return (
    <Fragment>
      <Head>
        <title>Sung's Blog</title>
        <meta name="description" content="프로그래밍과 웹 개발에 대한 포스팅" />
      </Head>
      <Hero />

      <FeaturedPosts posts={posts} />
    </Fragment>
  );
};

export const getStaticProps = () => {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
};

export default HomePage;
