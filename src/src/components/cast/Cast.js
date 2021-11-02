import Query from "../../components/ApiServise";
import { useEffect, useState } from "react";
import s from "./cast.module.css";
import PropTypes from "prop-types";

export default function Cast({ filmId }) {
    const [dataCast, setDataCast] = useState(null);

    useEffect(() => {
        Query(`/3/movie/${filmId}/credits`, [])
            .then((res => setDataCast(res)))
            .catch((err) => console.log(err))
    },[filmId])

    const imgUrl = (el) => {
        if(el.profile_path){
            return `https://image.tmdb.org/t/p/w500${el.profile_path}`
        }
        else {
            return "http://placekitten.com/200/300"
                }
    }
    
    if (dataCast) {
        return dataCast.data.cast.map((el) => (
            <div className={s.container} key={el.id}>
              <p className={s.title}>{el.name}</p>
                <img className={s.img} src={imgUrl(el)} alt={el.name}  />
            </div> 
        ))
    } else{return null}
}

Cast.propTypes = {
  filmId: PropTypes.string.isRequired
}