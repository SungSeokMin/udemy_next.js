import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { getEventById } from '../../../dummy-data';

import EventSummary from '../../../components/eventDetail/EventSummary';
import EventLogistics from '../../../components/eventDetail/EventLogistics';
import EventContent from '../../../components/eventDetail/EventContent';

const EventDetailPage = () => {
  const { query } = useRouter();

  const event = getEventById(query.eventId);

  if (!event) {
    return <p>No event found!</p>;
  }

  const { id, title, description, image, date, location, isFeatured } = event;

  return (
    <Fragment>
      <EventSummary title={title} />

      <EventLogistics date={date} image={image} address={location} imageAlt={title} />

      <EventContent>
        <p>{description}</p>
      </EventContent>
    </Fragment>
  );
};

export default EventDetailPage;
