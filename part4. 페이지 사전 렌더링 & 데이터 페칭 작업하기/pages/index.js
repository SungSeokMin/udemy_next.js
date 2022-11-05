import EventList from '../components/events/EventList';

import { getFeaturedEvents } from '../helpers/api-util';

const HomePage = ({ events }) => {
  return (
    <div>
      <EventList events={events} />
    </div>
  );
};

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
};

export default HomePage;
