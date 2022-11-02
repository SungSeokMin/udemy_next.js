import path from 'path';
import fs from 'fs/promises';

import { Fragment } from 'react';

const ProductDetailPage = ({ product }) => {
  const { title, description } = product;
  return (
    <Fragment>
      <h1>{title}</h1>
      <p>{description}</p>
    </Fragment>
  );
};

export default ProductDetailPage;

export const getStaticProps = async (context) => {
  const { params } = context;
  const { productId } = params;

  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);

  const { products } = JSON.parse(jsonData);

  const product = products.find((product) => product.id === productId);

  return {
    props: { product },
    revalidate: 2, // 10초
  };
};
