const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const movieContainer = document.getElementById('movieContainer');

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value;
  if (searchTerm.trim() === '') {
    alert('Please enter a movie title');
    return;
  }

  fetchMovieData(searchTerm);
});

async function fetchMovieData(searchTerm) {
  const apiKey = '31712de0';
  const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === 'True') {
      displayMovies(data.Search);
    } else {
      movieContainer.innerHTML = `<p>No movies found for "${searchTerm}"</p>`;
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

function displayMovies(movies) {
  movieContainer.innerHTML = '';
  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    movieElement.innerHTML = `
      <h2>${movie.Title}</h2>
      <p>Year: ${movie.Year}</p>
      <p>Type: ${movie.Type}</p>
    `;
    movieContainer.appendChild(movieElement);
  });
}