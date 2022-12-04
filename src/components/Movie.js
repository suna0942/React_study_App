import PropTypes from "prop-types";
import {Link} from "react-router-dom";

function Movie({coverImg, title, year, summary, genres}){
  return (
  <div>
    <img src={coverImg} alt={title}/>
    <h2>
      <Link to="/movie">{title} ({year})</Link>
    </h2>
    <p>{summary}</p>
    {genres &&=
    <ul>
    {genres.map(g => <li key={g}>{g}</li>)}
    </ul>}
  </div>
)};

Movie.propTypes = {
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Movie;