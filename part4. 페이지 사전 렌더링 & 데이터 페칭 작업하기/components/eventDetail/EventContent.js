import classes from './eventContent.module.css';

function EventContent({ children }) {
  return <section className={classes.content}>{children}</section>;
}

export default EventContent;
