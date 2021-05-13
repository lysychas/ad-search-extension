const api = 'https://ad-search-extension.herokuapp.com';
// const api = 'http://localhost:3000';
const form = document.querySelector('.form');
const keyword = document.querySelector('.search-bar');
const results = document.querySelector('.results');

// declare a method to search by country name
const searchAds = async (keyword) => {
  results.innerHTML = '';

  if (!keyword.trim()) {
    results.innerHTML = 'Could not get data, try searching for something.';
    return;
  }

  if (keyword.trim().toLowerCase() == 'giveallads') {
    try {
      fetch(`${api}/search/all`)
        .then((res) => res.json())
        .then((data) => {
          data.forEach((entry, index) => {
            listAds(entry, index);
          });
        });
    } catch (error) {
      results.innerHTML = error;
    }
    return;
  }

  try {
    fetch(`${api}/search?q=${keyword}`)
      .then((res) => res.json())
      .then((data) => {
        if (data === undefined || data.length === 0) {
          results.innerHTML =
            'Could not get data, try searching for something else.';
        }
        data.forEach((entry, index) => {
          listAds(entry, index);
        });
      });
  } catch (error) {
    results.innerHTML = error;
  }
};

// declare a function to handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  searchAds(keyword.value);
};

form.addEventListener('submit', (e) => handleSubmit(e));

function listAds(entry, index) {
  let li = document.createElement('li');
  li.classList = 'ad';
  li.id = index;
  let link = document.createElement('a');
  let desc = document.createElement('p');

  link.href = entry.link;
  link.innerText = entry.title;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';

  desc.innerText = entry.description;

  li.append(link);
  li.append(desc);
  results.appendChild(li);
}
