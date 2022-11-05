import { Fragment } from 'react';
import { getAllEvents } from '../../dummy-data';
import { useRouter } from 'next/router';

import EventList from '../../components/events/EventList';
import EventSearch from '../../components/events/EventSearch';

const AllEventsPage = () => {
  // hooks
  const router = useRouter();

  // data
  const events = getAllEvents();

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

export default AllEventsPage;
