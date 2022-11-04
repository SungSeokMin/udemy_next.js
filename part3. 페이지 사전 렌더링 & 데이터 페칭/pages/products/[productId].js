import path from 'path';
import fs from 'fs/promises';

import { Fragment } from 'react';

const ProductDetailPage = ({ product }) => {
  if (!product) {
    return <p>Loading ... </p>;
  }

  const { title, description } = product;

  return (
    <Fragment>
      <h1>{title}</h1>
      <p>{description}</p>
    </Fragment>
  );
};

export default ProductDetailPage;

const getData = async () => {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);

  const { products } = JSON.parse(jsonData);

  return products;
};

export const getStaticPaths = async () => {
  const products = await getData();

  const paths = products.map((product) => ({
    params: { productId: product.id },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const { productId } = params;

  const products = await getData();

  const product = products.find((product) => product.id === productId);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: { product },
  };
};
