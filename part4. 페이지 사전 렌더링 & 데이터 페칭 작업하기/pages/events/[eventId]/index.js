import { Fragment } from 'react';
import { getEventById, getFeaturedEvents } from '../../../helpers/api-util';

import EventSummary from '../../../components/eventDetail/EventSummary';
import EventLogistics from '../../../components/eventDetail/EventLogistics';
import EventContent from '../../../components/eventDetail/EventContent';

const EventDetailPage = (event) => {
  if (!event) {
    return <p>No event found!</p>;
  }

  const { title, description, image, date, location } = event;

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

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({
    params: {
      eventId: event.id,
    },
  }));

  return { paths, fallback: true };
};

export const getStaticProps = async (context) => {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: { event },
    revalidate: 30,
  };
};

export default EventDetailPage;
