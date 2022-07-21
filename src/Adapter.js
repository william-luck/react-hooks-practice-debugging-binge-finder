class Adapter {
  static getShows() {
    fetch("http://api.tvmaze.com/shows")
      .then(res => res.json())
  }

  static getShowEpisodes (showID){
    fetch(`http://api.tvmaze.com/shows/${showID}/episodes`)
      .then(res => res.json())
  }
}

export default Adapter
