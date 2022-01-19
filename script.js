APIkey="YNoK8YKncMpV0vP8nBEPnL1uFXi01FeCJ5JGBQQs";
APIurl="https://api.nasa.gov/planetary/apod?api_key=";


const getImage = async () => {
    const endpoint = APIurl+APIkey;
  try{
    const response = await fetch(endpoint);

    if(response.ok){
      const jsonResponse = await response.json();
      const responseURL = jsonResponse.url;

// animated transition from the loading stage to the main picture
      loadingAnimation();

//add link to the picture
      document.getElementById("link").href = responseURL;
      document.getElementById("link").innerHTML = responseURL;

// two scenarios for a picture and a video link
      if (responseURL.includes('.jpg')) {
        document.getElementById("post-image").innerHTML= `<img src="${responseURL}" alt="${jsonResponse.title}">`     
      } else {
        document.getElementById("post-image").innerHTML = `<iframe width="auto" height="auto" src="${responseURL}"></iframe>`
      }
// publish APOD description
      document.getElementById("text").innerHTML=
      `<p class="post-title">${jsonResponse.title}<span> - ${jsonResponse.date}</span></p>
      <p class="post-description">${jsonResponse.explanation}</p>`
    }
  }
  catch(error){
    console.log(error)
  }
}
// toggle Like button status
let like = document.querySelector('.like');
like.onclick = function() {
  like.classList.toggle('active');
}


function loadingAnimation() {
  document.getElementById("preloader").style.animation = "fadeOut 3s";
  setTimeout(() => {
    document.getElementById("preloader").style.display = "none",
    document.getElementById("post-image").style.animation = "fadeIn 2s",
    document.getElementById("post-image").style.display = "inline-block"
  }, 2000);
};

getImage();