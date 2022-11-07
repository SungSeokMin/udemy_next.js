import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

const getPostData = (fileName) => {
  const filePath = path.join(postsDirectory, fileName);
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const { data, content } = matter(fileContent);

  const postSlug = fileName.replace(/\.md$/, '');

  const postData = {
    slug: postSlug,
    content,
    ...data,
  };

  return postData;
};

export const getAllPosts = () => {
  const postFiles = fs.readdirSync(postsDirectory);

  const allPosts = postFiles.map((postFile) => getPostData(postFile));

  return allPosts.sort((postA, postB) => (postA.date > postB.date ? -1 : 1));
};

export const getFeaturedPosts = () => {
  const allPosts = getAllPosts();

  return allPosts.filter((post) => post.isFeatured);
};
