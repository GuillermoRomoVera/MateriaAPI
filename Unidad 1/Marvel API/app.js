const marvel = {
  render: () => {
    


    const urlAPI = 'https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=438e4fa7cdae8a06da439d162d9d17f6&hash=02ac4e2acac99259fe8af1ba479d59dd';
    const container = document.querySelector('#marvel-row');
    let contentHTML = '';

    fetch(urlAPI)
      .then(res => res.json())
      .then((json) => {
        for (const hero of json.data.results) {
          let urlHero = hero.urls[0].url;
          contentHTML += `
            <div class="col-md-4">
                <a href="${urlHero}" target="_blank">
                  <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}" class="img-thumbnail">
                </a>
                <h3 class="title">${hero.name}</h3>
            </div>`;
        }
        container.innerHTML = contentHTML;
      })
  }
};
marvel.render();