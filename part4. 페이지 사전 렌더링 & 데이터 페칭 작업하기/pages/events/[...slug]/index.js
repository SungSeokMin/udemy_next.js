import { Fragment } from 'react';
import { getFilteredEvents } from '../../../helpers/api-util';

import EventList from '../../../components/events/EventList';
import ResultsTitle from '../../../components/events/ResultsTitle';
import Button from '../../../components/ui/button';
import ErrorAlert from '../../../components/ui/ErrorAlert';

const FilteredEventsPage = ({ hasError, events = [], year, month }) => {
  if (!events) {
    return <p>Loading ...</p>;
  }

  if (hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Envets</Button>
        </div>
      </Fragment>
    );
  }

  if (!events || events.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No Events !</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Envets</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(year, month - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList events={events} />
    </Fragment>
  );
};

export const getServerSideProps = async (context) => {
  const { params } = context;

  const filterData = params.slug;
  const [year, month] = filterData;

  const numYear = +year;
  const numMonth = +month;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: { hasError: true },
    };
  }

  const filteredEvents = await getFilteredEvents({ year: numYear, month: numMonth });

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
};

export default FilteredEventsPage;
