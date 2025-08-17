import { formatDistanceToNow } from 'date-fns';

const TimeAgo = ({ isoDateString }) => {
  if (!isoDateString) {
    return null; 
  }

  try {
    const date = new Date(isoDateString);
    const timeAgo = formatDistanceToNow(date, { 
      addSuffix: true, 
    });

    return timeAgo.charAt(0).toUpperCase() + timeAgo.slice(1);

  } catch (error) {
    console.error("Invalid date format:", isoDateString);
    return null;
  }
};

export default TimeAgo;