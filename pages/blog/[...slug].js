import { useRouter } from 'next/router';

const BlogPostsPage = () => {
  const router = useRouter();

  console.log(router);

  return <div>BlogPosts Page</div>;
};

export default BlogPostsPage;
