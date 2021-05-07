const api = 'https://ad-search-extension.herokuapp.com';
// const api = 'http://localhost:3000';
const form = document.querySelector('.form');
const keyword = document.querySelector('.search-bar');
const results = document.querySelector('.results');

// declare a method to search by country name
const searchAds = async (keyword) => {
  results.innerHTML = '';
  try {
    fetch(`${api}/search?q=${keyword}`)
      .then((res) => res.json())
      .then((data) => {
        data.forEach((entry) => {
          let li = document.createElement('li');
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
