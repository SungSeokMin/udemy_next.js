import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getFilteredEvents } from '../../../dummy-data';

import EventList from '../../../components/events/EventList';
import ResultsTitle from '../../../components/events/ResultsTitle';
import Button from '../../../components/ui/button';
import ErrorAlert from '../../../components/ui/ErrorAlert';

const FilteredEventsPage = () => {
  const { query } = useRouter();

  const filterData = query.slug;

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const [year, month] = query.slug;

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

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

  if (!filteredEvents || filteredEvents.length === 0) {
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

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </Fragment>
  );
};

export default FilteredEventsPage;
