# 목차

📌 [Next.js 라우팅](파일-기반의-라우팅)  
📌 [동적 라우팅에서 path parameter 추출하기](동적-라우팅에서-path-parameter-추출하기)  
📌 [Catch all routes](Catch-all-routes)

---

> ## 파일 기반의 라우팅

기존 React의 라우팅 방식은 `react-router-dom` 모듈을 통해 구현할 수 있다.

```js
import { React } from 'react';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        Home
      </Route>
      <Route path="/products" element={<Products />}>
        Products
      </Route>
      <Route path="/products/:id" element={<Product />}>
        Product
      </Route>
    </Routes>
  );
};
```

하지만 Next.js는 `파일 기반의 라우팅` 방식으로 보다 간편하게 라우팅 처리를 할 수 있다.

```js
pages/index.js -> '/'

pages/products/index.js -> '/products'

pages/products/[id].js -> '/products/:id'
```

> ## 동적 라우팅에서 path parameter 추출하기

`router object`의 query 속성을 이용하면 path parameter를 손쉽게 추출할 수 있다.

```js
// pages/portfolio/[projectId]/index.js

import { useRouter } from 'next/router';

const PortfolioProjectPage = () => {
  const router = useRouter();

  console.log(router);
  console.log(router.query.projectId); // path parameter

  return <div>Portfolio Project Page</div>;
};

export default PortfolioProjectPage;
```

<img src="https://user-images.githubusercontent.com/72539723/198908379-c5782909-eb94-4497-8fdc-f6c3aea7538c.png" width="414" alt="router 객체">

> ## Catch all routes

대괄호[] 안에 세 개의 점을 추가하여 동적 경로를 확장하여 모든 경로를 포착할 수 있다.

예를들어, 특정 날짜로 블로그 게시글을 조회하는 기능이 있다고 가정했을 때,`/blog/2022/10/31` 이런 식으로 `2022`, `10`, `31`의 값을 추출하는 기능이다.

`2022`, `10`, `31`은 언제나 변할 수 있는 동적인 값이다.

```js
// pages/blog/[...slug].js

import { useRouter } from 'next/router';

const BlogPostsPage = () => {
  const router = useRouter();

  console.log(router);

  return <div>BlogPosts Page</div>;
};

export default BlogPostsPage;
```

<img  src="https://user-images.githubusercontent.com/72539723/198910442-cb332ddc-906f-4929-ad18-245eafdeff8f.png" width="414" alt="catch all routes">
