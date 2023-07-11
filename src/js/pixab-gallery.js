import Notiflix from 'notiflix';

import SlimSelect from 'slim-select';
new SlimSelect({
  select: '#single',
});


const refs = {
  gallery: document.querySelector('.gallery'),
  searchForm: document.querySelector('#search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
};

import { UnsplashApi } from './pixab-api';

const unsplashApi = new UnsplashApi();
let currentPage = 1;

function createImageGallery(images) {
  return images.map(image => createImageCard(image)).join('');
}

function createImageCard(image) {
  return `
    <div class="photo-card">
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy">
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${image.likes}</p>
        <p class="info-item"><b>Views:</b> ${image.views}</p>
        <p class="info-item"><b>Comments:</b> ${image.comments}</p>
        <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
      </div>
    </div>
  `;
}

function appendGalleryMarkup(markup) {
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}



function handleLoadMoreBtnClick() {
  currentPage++;
  unsplashApi.page = currentPage;

  unsplashApi.fetchPhotos()
    .then(data => {
      const galleryMarkup = createImageGallery(data.hits);
      appendGalleryMarkup(galleryMarkup);
      if (data.totalHits <= currentPage * unsplashApi.perPage) {
        hideLoadMoreBtn();
      }
    })
    .catch(error => {
      console.log(error);
    });
}

function handleFormSubmit(event) {
  event.preventDefault();
  const searchQuery = event.target.elements.searchQuery.value.trim();
  unsplashApi.searchQuery = searchQuery;

  if (searchQuery === '') return;

  currentPage = 1;
  unsplashApi.page = currentPage;

  clearGallery();

  unsplashApi.fetchPhotos()
    .then(data => {
      const galleryMarkup = createImageGallery(data.hits);
      appendGalleryMarkup(galleryMarkup);
      if (data.totalHits > unsplashApi.perPage) {
        showLoadMoreBtn();
      } else {
        hideLoadMoreBtn();
      }
    })
    .catch(error => {
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    });
}

function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

function hideLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('is-hidden');
}

refs.searchForm.addEventListener('submit', handleFormSubmit);
refs.loadMoreBtn.addEventListener('click', handleLoadMoreBtnClick);
