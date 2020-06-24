import React from 'react';
import { GetServerSideProps } from 'next';

import Timetable from '~/components/Timetable';

const IndexPage: React.FC = () => (
  <div>
    <p>Hello Next.js</p>
    <Timetable />
  </div>
);

export const getServerSideProps: GetServerSideProps = () => {
  const currentTime = Date.now();
  return {
    props: { currentTime },
  };
};

export default IndexPage;
