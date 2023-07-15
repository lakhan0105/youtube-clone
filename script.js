// Selecting the elements
const videosConatiner = document.querySelector(".videos-container");
const filterBtnsContainer = document.querySelector(".buttons-container");
const inputForm = document.querySelector(".input-form");
const searchInputText = document.querySelector(".search-input");
const searchIcon = document.querySelector(".search-icon");

// Initialization
const categoriesSet = new Set(["all"]);
let itemNotFound = false;

// FUNCTION TO DISPLAY THE VIDEOS ON THE HOME PAGE **************************************************************
function displayVideos(arr) {
  const mapped = arr
    .map((video) => {
      const {
        videoName,
        videoViews,
        videoLikes,
        videoTumnail,
        videoDuration,
        videoCategory,
        channelName,
        channelDp,
      } = video;

      return `<article class="video-article">
                <div class="img-container">
                    <img class="video-img" src="${videoTumnail}" alt="not found">
                </div>

                <div class="video-footer">
                    <div class="channel-dp">
                        <img src="${channelDp}" alt="channel dp not found">
                    </div>
                    <div class="video-info">
                        <div class="video-info-top">
                            <p class="video-name"> ${videoName}</p>
                            <p class="channel-name">${channelName}</p>
                        </div>
                        <div class="video-info-bottom">
                            <p class="video-views">${videoViews}</p>
                            <span>.</span>
                            <p class="video-upload-time">1 year ago</p>
                        </div>
                    </div>
                </div>
             </article>`;
    })
    .join("");

  return mapped;
}
videosConatiner.innerHTML = displayVideos(videosArray);

// Creating a set which consist of all the categories (duplicates will be removed)
videosArray.filter((video) => {
  // iterate over the videoscategories of each video
  // and add them inside categoriesSet set
  for (let category of video.videoCategory) {
    categoriesSet.add(category);
  }
});
const categoriesArray = [...categoriesSet]; // convert set into arrays and store them

// FUNCTION TO DISPLAY THE FILTER BUTTONS ON THE HOME PAGE ******************************************************
function displayFilterBtns() {
  const mappedBtns = categoriesArray
    .map((categoryName) => {
      return `<button class="btn filter-btn" data-id="${categoryName}">${categoryName}</button>`;
    })
    .join("");
  return mappedBtns;
}
filterBtnsContainer.innerHTML = displayFilterBtns();

// EVENT LISTENER FOR THE FILTER BUTTONS ************************************************************************
const filterBtns = [...document.querySelectorAll(".filter-btn")];
filterBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // filter if the dataset.id of the clicked btn is same as the category of the video and display them
    const filteredVids = videosArray.filter((video) => {
      for (let i = 0; i < video.videoCategory.length; i++) {
        if (e.target.dataset.id === video.videoCategory[i]) {
          console.log(video);
          return video;
        }
      }
    });

    if (e.target.dataset.id === "all") {
      videosConatiner.innerHTML = displayVideos(videosArray);
    } else {
      videosConatiner.innerHTML = displayVideos(filteredVids);
    }

    return filteredVids;
  });
});

// EVENT LISTENER FOR KEYUP
const videosArrayDuplicate = [...videosArray];

searchIcon.addEventListener("click", function (e) {
  const searchFilter = videosArray.filter((video) => {
    return video.videoName.toLowerCase().includes(searchInputText.value);
  });

  // if the result not found, searchFilter.length will be 0 and display "result not found"
  if (searchFilter.length === 0) {
    itemNotFound = true;
    videosConatiner.innerHTML = "result not found";
  } else {
    itemNotFound = false;
    videosConatiner.innerHTML = displayVideos(searchFilter);
  }

  return searchFilter;
});
