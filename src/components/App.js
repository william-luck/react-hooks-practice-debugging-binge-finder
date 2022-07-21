import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import TVShowList from "./TVShowList";
import Nav from "./Nav";
import SelectedShowContainer from "./SelectedShowContainer";

function App() {
  const [shows, setShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShow, setSelectedShow] = useState("");
  const [episodes, setEpisodes] = useState([]);
  const [filterByRating, setFilterByRating] = useState("");
  const [reload, setReload] = useState(true)

  let displayShows = [...shows];

  useEffect(() => {
      fetch("http://api.tvmaze.com/shows")
        .then(res => res.json())
        .then(shows => setShows(shows))
  }, [reload]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  function handleSearch(e) {
    setSearchTerm(e.target.value.toLowerCase());
    displayShows = shows.filter(show => show.name.toLowerCase().includes(e.target.value))
    console.log(displayShows)
    if (e.target.value === '') {
      setReload(!reload)
    } else {
      setShows(displayShows)
    }
  }

  function handleFilter(e) {

    console.log(e.target.value)
    e.target.value === "No Filter"
      ? setFilterByRating("")
      : setFilterByRating(e.target.value);
  }

  function selectShow(show) {

    console.log(show)
      fetch(`http://api.tvmaze.com/shows/${show.id}/episodes`)
        .then(res => res.json())
        .then(episodes => {
          setSelectedShow(show)
          setEpisodes(episodes)
          console.log(episodes)
        })
    };
  

  if (filterByRating >= 1) {
    displayShows = displayShows.filter((s) => {
      return (s.rating.average >= filterByRating);
    });
    let max = parseInt(filterByRating) + 1
    displayShows = displayShows.filter(s => s.rating.average < max)
  }

  return (
    <div>
      <Nav
        handleFilter={handleFilter}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
      />
      <Grid celled>
        <Grid.Column width={5}>
          {!!selectedShow ? (
            <SelectedShowContainer
              selectedShow={selectedShow}
              allEpisodes={episodes}
            />
          ) : (
            <div />
          )}
        </Grid.Column>
        <Grid.Column width={11}>
          <TVShowList
            shows={displayShows}
            selectShow={selectShow}
            searchTerm={searchTerm}
          />
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default App;
