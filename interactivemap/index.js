console.log("Hello welcome back shaher");

const dialouge=document.querySelector('.mem_card');
const active=document.querySelector('.active');
const svg = document.querySelector("svg");

// Set the distance from the screen edges at which scrolling should start
const scrollThreshold = 50;

// Listen for the mousemove event
window.addEventListener('mousemove', handleMouseMove);

function handleMouseMove(event) {
  const { clientX, clientY } = event;

  // Get the dimensions of the viewport
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  // Calculate the distances from the mouse position to the screen edges
  const distanceFromTop = clientY;
  const distanceFromBottom = viewportHeight - clientY;
  const distanceFromLeft = clientX;
  const distanceFromRight = viewportWidth - clientX;

  // Check if the mouse is within the scroll threshold of any screen edge
  if (distanceFromTop < scrollThreshold) {
    // Scroll up
    window.scrollBy(0, -10); // Adjust the scroll speed as needed
  } else if (distanceFromBottom < scrollThreshold) {
    // Scroll down
    window.scrollBy(0, 10); // Adjust the scroll speed as needed
  } else if (distanceFromLeft < scrollThreshold) {
    // Scroll left
    window.scrollBy(-10, 0); // Adjust the scroll speed as needed
  } else if (distanceFromRight < scrollThreshold) {
    // Scroll right
    window.scrollBy(10, 0); // Adjust the scroll speed as needed
  }
}



//Highlighter on svg
svg.addEventListener("mouseover", (e) => {
  const target = e.target;
  const { screenX, screenY } = e;
  console.log(`Clicked at x: ${screenX}, y: ${screenY}`);
  if (target.tagName !== "svg") {
    target.style.stroke = "red";
    target.style.strokeWidth = "5px";
    target.style.cursor = "pointer";

  }
 
   
});
svg.addEventListener("mouseout", (e) => {
  const target = e.target;
  if (target.tagName !== "svg") {
    target.style.stroke = "";
    target.style.strokeWidth = "";
    target.style.cursor = "";

  }
 
 
});


let rect = document.querySelectorAll("rect");
rect.forEach((p) => {
    p.addEventListener("mouseleave", (evt) => {
      card.style.display = "none";  
  });
  p.addEventListener("mousemove", (evt) => {
    let pos = oMousePos(svg, evt);
    let text = p.dataset.text;
    text = text.replace(/\|/g, "<br/>"); // Replace | with line breaks
   
    card.style.display = "block";
    card.style.top = pos.y + "px";
    card.style.left = pos.x + "px";
    card.innerHTML = text;
    
  });

});

function oMousePos(element, evt) {
  let ClientRect = element.getBoundingClientRect();
  return {
    //objeto
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top)
  };
}



let path = document.querySelectorAll("path");
path.forEach((p) => {
    p.addEventListener("mouseleave", (evt) => {
      card.style.display = "none";  
  });
  p.addEventListener("mousemove", (evt) => {
    let pos = oMousePos(svg, evt);
    let text = p.dataset.text;
    text = text.replace(/\|/g, "<br/>"); // Replace | with line breaks

   
    card.style.display = "block";
    card.style.top = pos.y + "px";
    card.style.left = pos.x + "px";
    card.innerHTML = text;
  });

});

function oMousePos(element, evt) {
  let ClientRect = element.getBoundingClientRect();
  return {
    //objeto
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top)
  };
}

//DROP DOWN BUTTON ANIMATION

const dropdownBtn = document.getElementById('dropdown-btn');
// const legendList = document.getElementById('legend-list');

// Add the blinking effect every second
setInterval(() => {
  dropdownBtn.classList.toggle('blink-animation');
}, 1000);

//svg provided
fetch("images.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(images) {
    let placeholder = document.querySelector('#data-output');
    let out = "";

    const dataOutput = document.querySelector('#data-output');
    // const svg = document.querySelector('svg');
    svg.addEventListener("click", (e) => {
      const target = e.target;
      if (target.classList.contains("eporium")) {
        placeholder.innerHTML = generateCarouselHTML(images[0]);
        dataOutput.classList.remove('d-none');
        dataOutput.scrollIntoView('behaviour')
      } else if (target.classList.contains("masjid")) {
        placeholder.innerHTML = generateCarouselHTML(images[1]);
        dataOutput.classList.remove('d-none');
        dataOutput.scrollIntoView('behaviour')
      }else if (target.classList.contains("shair-shop")) {
        placeholder.innerHTML = generateCarouselHTML(images[2]);
        dataOutput.classList.remove('d-none');
        dataOutput.scrollIntoView('behaviour')
      }else if (target.classList.contains("majid-house")) {
        placeholder.innerHTML = generateCarouselHTML(images[3]);
        dataOutput.classList.remove('d-none');
        dataOutput.scrollIntoView('behaviour')
      }else if (target.classList.contains("ayaaz-house")) {
        placeholder.innerHTML = generateCarouselHTML(images[4]);
        dataOutput.classList.remove('d-none');
        dataOutput.scrollIntoView('behaviour')
      }else if (target.classList.contains("atif-house")) {
        placeholder.innerHTML = generateCarouselHTML(images[5]);
        dataOutput.classList.remove('d-none');
        dataOutput.scrollIntoView('behaviour')
      }else if (target.classList.contains("shahyaan-house")) {
        placeholder.innerHTML = generateCarouselHTML(images[6]);
        dataOutput.classList.remove('d-none');
        dataOutput.scrollIntoView('behaviour')
      }else if (target.classList.contains("haseeb-house")) {
        placeholder.innerHTML = generateCarouselHTML(images[7]);
        dataOutput.classList.remove('d-none');
        dataOutput.scrollIntoView('behaviour')
      }else if (target.classList.contains("zameer-shop")) {
        placeholder.innerHTML = generateCarouselHTML(images[8]);
        dataOutput.classList.remove('d-none');
        dataOutput.scrollIntoView('behaviour')
      }else if (target.classList.contains("hamid-shop")) {
        placeholder.innerHTML = generateCarouselHTML(images[9]);
        dataOutput.classList.remove('d-none');
        dataOutput.scrollIntoView('behaviour')
      }else if (target.classList.contains("muneeb-plot")) {
        placeholder.innerHTML = generateCarouselHTML(images[10]);
        dataOutput.classList.remove('d-none');
        dataOutput.scrollIntoView('behaviour')
      }else if (target.classList.contains("irfan-plot")) {
        placeholder.innerHTML = generateCarouselHTML(images[11]);
        dataOutput.classList.remove('d-none');
        dataOutput.scrollIntoView('behaviour')
      }
      
      
    });
  });
 
function generateCarouselHTML(image) {
  return `
      <h1 class=" text-whtie display-5  text-center p-lg-5">${image.name}'s Property Images</h1>
      <div class="d-flex justify-content-center m-5">
          <div id="carouselExampleInterval" class="carousel slide w-50" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active" data-bs-interval="10000">
                <img src="${image.imageURL1}" class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item" data-bs-interval="2000">
                <img src="${image.imageURL2}" class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item" data-bs-interval="2000">
                <img src="${image.imageURL3}" class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src="${image.imageURL4}" class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src="${image.imageURL5}" class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src="${image.imageURL6}" class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src="${image.imageURL7}" class="d-block w-100" alt="...">
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center m-5">
      <div>
          <div class="d-flex justify-content-center">
            <button class="btn bg-danger text-white fs-3 fw-bold p-3 m-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
              Show More Details
            </button>
          </div>
          <div class="collapse" id="collapseExample">
            <div class="card card-body m-4">
              <div class="container text-center fs-3 fw-bold text-secondary">
                <div class="row p-3 ">
                  <div class="col">${image.rooms}</div>
                  <div class="col">${image.bathrooms}</div>
                  <div class="col">${image.space} Marla</div>
                </div>
                <div class="row p-3 ">
                  <div class="col">Purpose: ${image.purpose}</div>
                  <div class="col">Internet: ${image.internet}</div>
                  <div class="col">Electricity: ${image.electricity}</div>

                </div>
                <div class="row p-3 ">
                  <div class="col">Gas: ${image.gas}</div>
                  <div class="col">Water: ${image.water}</div>
                  <div class="col">Bills Average: ${image.bills} PKR/Month</div>

                </div>
                <div class="row p-3">
                  <div class="col fw-bolder">Offer: ${image.offer} PKR</div>
                  <div class="col fw-bolder">RELPE Chat at ${image.availiable}</div>
                  <div class="col fw-bolder">Room ID: ${image.rId}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  `;
}



// Dropdown functionality
// Dropdown functionality
const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');

dropdownTriggers.forEach((trigger) => {
  trigger.addEventListener('click', function () {
    this.nextElementSibling.classList.toggle('show');
  });
});

// Close dropdown menu on click outside
window.addEventListener('click', function (event) {
  if (!event.target.matches('.dropdown-trigger')) {
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach((dropdown) => {
      if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
      }
    });
  }
});

