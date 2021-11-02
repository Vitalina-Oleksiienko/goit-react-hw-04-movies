import { useLocation, useParams,useHistory } from "react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import Query from "../../components/ApiServise";
import { NavLink, Route } from "react-router-dom";
import Reviews from '../../components/review/Review';
import Cast from '../../components/cast/Cast';
// import { Cast, Reviews } from "../../components";
import s from "./moviedetails.module.css";


export default function MovieDetails() {
    const [filmData,setFilmData] = useState(null);
    const params = useParams();
    const location = useLocation();
    const history = useHistory();
    const pathBack = useRef(location?.state?.from ?? "/");
    const requestBack=useRef(location?.state?.search??"")
    
    useEffect(() => {    
        Query(`movie/${ params.movieId }`, [])
            .then((res) => { setFilmData(res) })
            .catch((err) => console.log(err));
    }, [params]);
    
    const handleClickGoBack = useCallback(() => {
        history.push({
            pathname: pathBack.current,
           search: requestBack.current
        })
    },[history])
     
    if (filmData) {
        return (<>
        <div className={s.mainContent}>
            <div className={s.imgContent}>
                <button className={s.button} type="button" onClick={handleClickGoBack}>Go back</button>
                <img className={s.mainImg} src={`https://image.tmdb.org/t/p/w500${filmData.data.poster_path}`} alt="film poster" />
            </div>
            <div className={s.textCont}>
                <h3>{filmData.data.title}</h3>
                <p>{`User scores ${filmData.data.vote_average*10}%`}</p>
                <h3>Overiew</h3>
                <p>{filmData.data.overview}</p>
                <h3>Genres</h3>
                <p>{filmData.data.genres.map((el)=>`${el.name} `) }</p>
             
            </div>
        </div>
            <div className={s.addContent}>
                <h3> Additional information</h3>
                <ul>
                    <li>
                        <NavLink
                            className={s.addButton}
                            activeClassName={s.activeAddButton}
                            to={{ pathname: `/movies/${params.movieId}/cast`}}
                            >Cast</NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={s.addButton}
                            activeClassName={s.activeAddButton}
                            to={{ pathname: `/movies/${params.movieId}/reviews`}}
                            >Reviews</NavLink>
                    </li>
              </ul>
            </div>
            <Route  path="/movies/:movieId/cast">
                <Cast
                filmId={params.movieId}
                />
            </Route>
            <Route  path="/movies/:movieId/reviews">
                <Reviews
                filmId={params.movieId}
                />
            </Route>
            </>
        )
    } else {return null}   
}