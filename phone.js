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