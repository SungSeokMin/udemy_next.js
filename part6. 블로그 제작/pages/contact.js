import { Fragment } from 'react';

import Head from 'next/head';

import ContactForm from '../components/contact/ContactForm';
import Notification from '../components/ui/Notification';

const ContactPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Contact Me</title>
        <meta name="description" content="문의하기" />
      </Head>

      <ContactForm />

      <Notification title="Success" message="성공적으로 등록되었습니다." status="success" />
    </Fragment>
  );
};

export default ContactPage;
