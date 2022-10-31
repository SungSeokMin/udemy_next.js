# 목차

📌 [Next.js 라우팅](#파일-기반의-라우팅)  
📌 [Link 컴포넌트로 내비게이팅 하기](#link-컴포넌트로-내비게이팅-하기)  
📌 [동적 라우팅에서 path parameter 추출하기](#동적-라우팅에서-path-parameter-추출하기)  
📌 [Catch all routes](#catch-all-routes)

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

> ## Link 컴포넌트로 내비게이팅 하기

기존 React에서는 페이지 이동 시 `react-router-dom` 모듈의 `Link` 컴포넌트를 사용해야 라우팅이 가능했다.

```js
import { Link } from 'react-router-dom';

const App = () => {
  return <Link to="products">Products 페이지로 이동</Link>;
};
```

하지만 Next.js는 기본적으로 제공해주는 `next/link`의 `Link` 컴포넌트로 처리할 수 있다.  
다만, `href` 속성을 이용해야 한다.

```js
import Link from 'next/link';

const App = () => {
  return <Link href="products">Products 페이지로 이동</Link>;
};
```

또한, `useRouter` hooks를 이용하는 방법도 있다.

```js
import { useRouter } from 'next/router';

const App = () => {
  const router = useRouter();

  const onMove = () => router.push('/products');

  return <button onClick={onMove}>moving products page</button>;
};
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
