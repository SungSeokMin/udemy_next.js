import { Fragment } from 'react';
import { getAllEvents } from '../../helpers/api-util';

import EventList from '../../components/events/EventList';
import EventSearch from '../../components/events/EventSearch';

const AllEventsPage = (events) => {
  const handleSearch = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <Fragment>
      <EventSearch onSearch={handleSearch} />
      <EventList events={events} />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: { events },
  };
};

export default AllEventsPage;
