class StreetService {

  getStreets() {
    return fetch("http://localhost:3000/api/streets")
      .then(response => response.json());
  }

  fetchStreetData (street) {
    return fetch("http://localhost:3000/api/streets/"+encodeURIComponent(street))
      .then(response => response.json());
  }
}

export default new StreetService();
