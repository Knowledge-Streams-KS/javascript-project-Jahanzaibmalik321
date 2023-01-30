window.onbeforeunload = function () {
    let movied = document.getElementById("moviedata").innerHTML;
    localStorage.setItem("moviedb", movied);
  };
  
  window.onload = function () {
    let mydata = localStorage.getItem("moviedb");
    if (mydata) {
      let movied = document.getElementById("moviedata");
      movied.innerHTML = mydata;
    }
    sessionStorage.clear();
  };
  
  async function getmoviedata() {
    let movied = document.getElementById("moviedata");
    movied.innerHTML = "";
  
    let name = document.getElementById("Title").value;
    let year = document.getElementById("Year").value;
  
    if (!name) {
      return;
    }
  
    const xdata = await fetch(`http://www.omdbapi.com/?s=${name}&apikey=9b061cb2`);
    let data = await xdata.json();
    let arrdata = data["Search"];
    if (year) {
      arrdata = arrdata.filter((movie) => {
        year <= movie["Year"];
      });
    }
    arrdata.forEach((element) => {
      movied.insertAdjacentHTML(
        "afterbegin", 
          `<div>
              <img src=${element["Poster"]} alt="NaN"> 
              <br>
              Title: ${element["Title"]}
              <br> 
              Year: ${element["Year"]} 
          </div>`
      );
    });
  }
  function resetmoviedata(){
    let movied = document.getElementById("moviedata");
    movied.innerHTML = "";
  }
  search_b = document.getElementById("searchbtn");
  search_b.addEventListener("click", getmoviedata);
  
  reset_b = document.getElementById("resetbtn");
  reset_b.addEventListener("click", resetmoviedata);
  
  
  