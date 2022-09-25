const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    const url =`https://openapi.programming-hero.com/api/phones?search=${searchText}`;
     //console.log(url);
  
     fetch(url).then((response) => {
      if (response.ok) {
          // console.log(response);
          return response.json();
      }
      throw new Error('Something went wrong');
  })
      .then((data) => {
          // console.log(data.data);
          data.status ? displaySearchResult(data.data) : displayError()
      })
  
      .catch((error) => {
          console.log(error)
      });
  }

  const displaySearchResult = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    console.log(phones)
    phones.forEach(phone => {
        // console.log(phone)
        const phDiv = document.createElement('div');
        phDiv.className = 'card h-100';
        phDiv.innerHTML = `
          <img onclick=selectItem(event,"${phone.slug}") src="${phone.image}" class="card-img-top" alt="" />
          <div class="card-body">
            <h2 class="card-title">'${phone.phone_name}'</h2>
            <div class="card-details hide">
  
            </div>
          </div>
          `;
        searchResult.appendChild(phDiv);
    }
  
    )
  
  }

  const displayError = () => {
    const errorText = document.getElementById('error');
  
    const errorMassage = document.createElement('h2');
  
    errorMassage.innerHTML = `<h2>Search Not Found<h2/>`;
    errorText.appendChild(errorMassage);
  
  }

  const selectItem = (event, id) => {
    let element = event.target.nextElementSibling;
    // console.log("id", element);
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(res => res.json())
        .then(data => showDetails(element, data.data));
  
  }

  const showDetails = (e, data) => {
    // console.log(e);
    const detailsDiv = e.querySelector('.card-details');
    console.log(detailsDiv, data);
    detailsDiv.classList.remove('hide');
    detailsDiv.innerHTML = `
                <h3>Features:</h3>
    <h4>${data.brand}</h4>
    <h4>${data.mainFeatures.displaySize}</h4>
    <h4>${data.releaseDate}</h4>
        `
  }