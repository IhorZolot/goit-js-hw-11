// import axios from 'axios';

// const API_KEY = '38168807-d28e71a0feea929e703b592b4';

// const BASE_URL = 'https://pixabay.com/api/';
// const RESULTS_PER_PAGE = 20;

// const searchForm = document.querySelector('#search-form');
// const gallery = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('.load-more');

// let currentPage = 1;
// let currentQuery = '';

// searchForm.addEventListener('submit', handleFormSubmit);
// loadMoreBtn.addEventListener('click', loadMoreImages);

// function handleFormSubmit(event) {
//   event.preventDefault();
//   const searchQuery = event.target.elements.searchQuery.value.trim();
//   if (searchQuery === '') return;

//   clearGallery();
//   currentQuery = searchQuery;
//   currentPage = 1;
//   fetchImages(currentQuery, currentPage);
// }

// function loadMoreImages() {
//   currentPage++;
//   fetchImages(currentQuery, currentPage);
// }

// function fetchImages(query, page) {
//   const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${RESULTS_PER_PAGE}`;

//   axios
//     .get(url)
//     .then(response => {
//       const data = response.data;
//       if (data.hits.length > 0) {
//         renderImages(data.hits);
//         if (data.totalHits > page * RESULTS_PER_PAGE) {
//           showLoadMoreBtn();
//         } else {
//           hideLoadMoreBtn();
//         }
//       } else {
//         showNoResultsMessage();
//       }
//     })
//     .catch(error => {
//       console.error('Error fetching images:', error);
//     });
// }

// function renderImages(images) {
//   const imageCards = images.map(image => createImageCard(image));
//   gallery.insertAdjacentHTML('beforeend', imageCards.join(''));
// }

// function createImageCard(image) {
//   return `
//     <div class="photo-card">
//       <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy">
//       <div class="info">
//         <p class="info-item"><b>Likes:</b> ${image.likes}</p>
//         <p class="info-item"><b>Views:</b> ${image.views}</p>
//         <p class="info-item"><b>Comments:</b> ${image.comments}</p>
//         <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
//       </div>
//     </div>
//   `;
// }

// function clearGallery() {
//   gallery.innerHTML = '';
// }

// function showLoadMoreBtn() {
//   loadMoreBtn.style.display = 'block';
// }

// function hideLoadMoreBtn() {
//   loadMoreBtn.style.display = 'none';
// }

// function showNoResultsMessage() {
//   gallery.innerHTML =
//     '<p class="no-results">Sorry, there are no images matching your search query. Please try again.</p>';
//   hideLoadMoreBtn();
// }
