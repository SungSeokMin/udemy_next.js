import Button from '../ui/button';
import classes from './resultsTitle.module.css';

function ResultsTitle({ date }) {
  const humanReadableDate = new Date(date).toLocaleDateString('ko-KR', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className={classes.title}>
      <h1>Events in {humanReadableDate}</h1>

      <Button link="/events">Show all events</Button>
    </section>
  );
}

export default ResultsTitle;
