function showMovieDetails(movieElement, movieTitle, movieOverview, movieReleaseDate) {
   const movieDetailsElements = document.querySelectorAll('.movies .movie-details');

 
   movieDetailsElements.forEach(element => {
     if (element !== movieElement.querySelector('.movie-details')) {
       element.remove();
     }
   });
 
   // Check if movie details overlay already exists
   const existingMovieDetails = movieElement.querySelector('.movie-details');
   if (existingMovieDetails) {
     existingMovieDetails.remove(); // Remove existing overlay if present
     return;
   }
 
   // Create the movie details overlay
   const movieDetailsElement = document.createElement('div');
   movieDetailsElement.classList.add('movie-details');
 
   const titleElement = document.createElement('h2');
   titleElement.textContent = movieTitle;
   movieDetailsElement.appendChild(titleElement);
 
   const overviewElement = document.createElement('p');
   overviewElement.textContent = movieOverview;
   movieDetailsElement.appendChild(overviewElement);
 
   const releaseDateElement = document.createElement('p');
   releaseDateElement.textContent = 'Release Date: ' + movieReleaseDate;
   movieDetailsElement.appendChild(releaseDateElement);
 
   // Append the movie details overlay to the movie element
   movieElement.appendChild(movieDetailsElement);
 }
 

 function searchMovies(query) {
   fetch(`https://api.themoviedb.org/3/search/movie?api_key=3166e86d5e85e38a8255fc7912a329bf&query=${query}`)
     .then(response => response.json())
     .then(data => {
      const results = data.results || [];

 
       // Clear movies container
       moviesContainer.innerHTML = '';
 
       results.forEach(movie => {
         const movieTitle = movie.title;
         const movieOverview = movie.overview;
         const moviePosterPath = movie.poster_path;
         const movieReleaseDate = movie.release_date;
 
         // Create the movie element
         const movieElement = document.createElement('div');
         movieElement.classList.add('movie');
 
         const posterElement = document.createElement('img');
         posterElement.src = 'https://image.tmdb.org/t/p/w500' + moviePosterPath;
         posterElement.classList.add('movie-poster');
         movieElement.appendChild(posterElement);
 
         // Attach the event listener to show/hide movie details on click
         movieElement.addEventListener('click', () => {
           showMovieDetails(movieElement, movieTitle, movieOverview, movieReleaseDate);
         });
 
         // Append the movie element to the movies container
         moviesContainer.appendChild(movieElement);
       });
     })
     .catch(error => console.log('Error:', error));
 }
 
 // Fetch movie data and create movie elements
 const movieIds = [603692, 385687, 569094, 447365, 1073140, 298618];
 const moviesContainer = document.querySelector('.main-right .movies');

 
 movieIds.forEach(movieId => {
   fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=3166e86d5e85e38a8255fc7912a329bf`)
     .then(response => response.json())
     .then(data => {
       // Process the movie data
       const movieTitle = data.title;
       const movieOverview = data.overview;
       const moviePosterPath = data.poster_path;
       const movieReleaseDate = data.release_date;
 
       // Create the movie element
       const movieElement = document.createElement('div');
       movieElement.classList.add('movie');
 
       const posterElement = document.createElement('img');
       posterElement.src = 'https://image.tmdb.org/t/p/w500' + moviePosterPath;
       posterElement.classList.add('movie-poster');
       movieElement.appendChild(posterElement);
 
       // Attach the event listener to show/hide movie details on click
       movieElement.addEventListener('click', () => {
         showMovieDetails(movieElement, movieTitle, movieOverview, movieReleaseDate);
       });
 
       // Append the movie element to the movies container
       moviesContainer.appendChild(movieElement);
     })
     .catch(error => console.log('Error:', error));
 });

 const searchButton = document.querySelector('.header-right .search-img');

 searchButton.addEventListener('click', () => {
   const searchInput = document.getElementById('searchInput');

   const query = searchInput.value.trim();
 
   if (query) {
     searchMovies(query);
   }
 });
 
//enterkey
 const searchInput = document.getElementById('searchInput');
 searchInput.addEventListener('keydown', event => {
   if (event.key === 'Enter') {
     const query = searchInput.value.trim();
 
     if (query) {
       searchMovies(query);
     }
   }
 });