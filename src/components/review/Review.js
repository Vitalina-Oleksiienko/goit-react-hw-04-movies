import Query from "../ApiServise";
import { useEffect, useState } from "react";
import s from "./review.module.css";
import PropTypes from "prop-types";

export default function Reviews({ filmId }) {
    const [dataReviews, setDataReviews] = useState();

    useEffect(() => {
        Query(`/3/movie/${filmId}/reviews`, [])
            .then((res) => {  setDataReviews(res) })
            .catch((err) => console.log(err));
    }, [filmId]
    )
    
    
    if (dataReviews) {
        
        if (dataReviews.data.results.length > 0) {
            return(
        <ul className={s.container}>
              {
                dataReviews.data.results.map((el) => (
                    <li key={el.id}>
                        <h4>{el.author}</h4>
                        <div className={s.container}>{el.content}</div>
                    </li>
                ))
                    }
        </ul>
            )
        } else { return <h4 className={s.title}>Sorry, we don't have any reviews for this movie</h4> }
    } else {return null}
}

Reviews.propTypes = {
  filmId: PropTypes.string.isRequired
  
}