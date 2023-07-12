import axios from 'axios';

export class UnsplashApi {
#API_KEY = '38168807-d28e71a0feea929e703b592b4';
#BASE_URL = 'https://pixabay.com/api';

constructor() {
this.searchQuery = '';
this.page = 1;
this.perPage = 40;
}

fetchPhotos() {
const params = {
q: this.searchQuery,
per_page: this.perPage,
page: this.page,
key: this.#API_KEY,
};

return axios.get(`${this.#BASE_URL}/`, { params })
  .then(response => {
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    
    return response.data;
  })
  .catch(error => {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    throw error;
  });
}
}






// import axios from 'axios';

// // const API_KEY = '38168807-d28e71a0feea929e703b592b4';
// // const BASE_URL = 'https://pixabay.com/api/';
// // const RESULTS_PER_PAGE = 12;

// export class UnsplashApi {
//   #API_KEY = '38168807-d28e71a0feea929e703b592b4';
//   #BASE_URL = 'https://pixabay.com/api';
  
//   constructor() {
//     this.searchQuery = '';
//     this.page = 1;
//   }

//   fetchPhotos() {
//     const searchParams = new URLSearchParams({
//       q: this.searchQuery,
//       per_page: 12,
//       page: this.page,
//       key: this.#API_KEY,
//     });

//     return fetch(`${this.#BASE_URL}/?${searchParams}`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(response.status);
//         }
//         return response.json();
//       })
//       .catch(error => {
//         console.error( error);
//       });
//   }
// }
