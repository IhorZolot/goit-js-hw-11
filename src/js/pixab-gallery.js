import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { UnsplashApi } from './pixab-api';

const refs = {
  gallery: document.querySelector('.gallery'),
  searchForm: document.querySelector('#search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const unsplashApi = new UnsplashApi();
let currentPage = 1;

function createImageGallery(images) {
  return images.map((image) => createImageCard(image)).join('');
}

function createImageCard(image) {
  return `
  <div class="photo-card">
   <a class="img-link" href="${image.largeImageURL}">
   <div class="img-box"> 
   <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy">
   </div>
     
     <div class="info">
      <p class="info-item"><b>Likes:</b> ${image.likes}</p>
      <p class="info-item"><b>Views:</b> ${image.views}</p>
      <p class="info-item"><b>Comments:</b> ${image.comments}</p>
      <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
     </div>
    </a>
  </div>
  `;
}

function appendGalleryMarkup(markup) {
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

async function handleLoadMoreBtnClick() {
  currentPage++;
  unsplashApi.page = currentPage;

  try {
    const data = await unsplashApi.fetchPhotos();
    const galleryMarkup = createImageGallery(data.hits);
    appendGalleryMarkup(galleryMarkup);
    if (data.totalHits <= currentPage * unsplashApi.perPage) {
      hideLoadMoreBtn();
    }
  } catch (error) {
    console.log(error);
  }
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const searchQuery = event.target.elements.searchQuery.value.trim();
  unsplashApi.searchQuery = searchQuery;

  if (searchQuery === '') return;

  currentPage = 1;
  unsplashApi.page = currentPage;

  clearGallery();

  try {
    const data = await unsplashApi.fetchPhotos();
    const galleryMarkup = createImageGallery(data.hits);
    appendGalleryMarkup(galleryMarkup);
    if ((data.totalHits / unsplashApi.perPage) > unsplashApi.page) {
      showLoadMoreBtn();
    } else {
      hideLoadMoreBtn();
    }
  } catch (error) {
    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
  }
}

function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

function hideLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('is-hidden');
}
const lightbox = new SimpleLightbox('.gallery a', {
  captionsDelay: 250,
});

refs.searchForm.addEventListener('submit', handleFormSubmit);
refs.loadMoreBtn.addEventListener('click', handleLoadMoreBtnClick);

