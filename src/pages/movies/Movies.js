import { useEffect, useState } from "react";
import { useHistory,useLocation,Route } from "react-router";
import Query from "../../components/ApiServise";
import List from "../../components/list/List";
import s from './movies.module.css';

export default function Movies() {
    const history = useHistory();
    const location = useLocation();
    const [text, setText] = useState("");
    const [urlSearch, setUrlSearch] = useState(()=>new URLSearchParams(location.search).get("query"));
    const [filmList, setFilmList] = useState([]);

    useEffect(() => {
        if (urlSearch === ""||urlSearch === null) { return };
        Query("search/movie", [["query", urlSearch]])
        .then((res) =>setFilmList(res.data.results))
        .catch((err) => { console.log(err) });
    },[urlSearch])
    
    const handleInput = (ev) => { setText(ev.target.value) };
    
    const handleSubmit = (ev) => {
        ev.preventDefault();
        history.push({ ...location, search: `query=${text}` });
        setUrlSearch(ev.target.input.value)
        setText("")
    }

    return (<>
        <form onSubmit={handleSubmit} className={s.form}>
        <input
            name="input"
            onChange={handleInput}
            type="text"
            value={text}
        />
        <button type="submit">search</button>
        </form>
        <Route exact path="/movies">
            <List
             dataArray={filmList}
         />
        </Route>
        </>)    
}