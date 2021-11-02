import { useState } from "react";
import Query from "../../components/ApiServise";
import s from "./home.module.css";
import List from "../../components/list/List";

export default function Home() {
    const [homeData, setHomeData] = useState(null);

    let markup;
    if(!homeData){ 
    Query("trending/movie/week", [])
        .then((res) =>setHomeData(res.data.results))
        .catch((err) => { console.log(err) });
    };
     if (homeData) {markup=
         (<div className={s.container}>
         <h2 className={s.title}>Trending today</h2>
         <List
             dataArray={homeData}
         />
     </div>)
    }else{markup=null}
    return markup
}
