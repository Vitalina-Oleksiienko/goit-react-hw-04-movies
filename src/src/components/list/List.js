import { Link } from "react-router-dom"; 
import { useLocation } from "react-router";
import s from './list.module.css';
import PropTypes from "prop-types";

export default function List({ dataArray }) {
    const location = useLocation();

     return (
        <ul className={s.container}>
                {dataArray.map((el) =>
                (<li key={el.id}>
                    <Link
                        to={{
                            pathname: `/movies/${el.id}`,
                            state: {
                                from: location.pathname,
                                search:location.search
                            }
                        }}
                    >
                        {el.title}
                   
                    </Link>
                </li>))}
        </ul>
     )
}
 
List.propTypes = {
  filmId: PropTypes.array
}