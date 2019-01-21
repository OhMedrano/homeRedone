import MakeElement from '../Tools/MakeElement.js';


const makeEle = new MakeElement;
  

function GetImgurData() {
  const albumId = '5b1Iw74';
  const imgurUrl = 'https://api.imgur.com/3/album/'+ albumId;
  const apiKey = 'd79980c38438700';

  return new Promise((resolve,reject) => {
    fetch(imgurUrl, {
      headers: {
        'Authorization': 'Client-ID ' + apiKey,
      }
    }).then(data => data.json())
      .then(data => {
        resolve(data.data);
      })
  })
}








class GalleryCarousel {
  constructor(imageCount, currentPage, images) {
    this.state = {
      currentCount: imageCount,
      currentPage: currentPage? currentPage : 0,
      totalPages: images ? Math.ceil(images.length / imageCount) : 0,
      images: images ? images : [],
      renderedImages: [],
    }
    this.changePage = this.changePage.bind(this);
    this.displayModal = this.displayModal.bind(this); 
  }


  imageSets(currentPage) {
    let startCount = this.state.currentCount * currentPage; 
    let endCount = startCount + this.state.currentCount;
    let imageResults = [];
    for(startCount; startCount < endCount; startCount++) {
      console.log(startCount);
      let currentImage = this.state.images[startCount];
      if(startCount >= this.state.images.length) {
        console.log('No image exist');
      } else {       
        let renderImageContainer = makeEle.createEle('div','renderImageContainer_'+(endCount - startCount), [3,6,12,2], 'renderImageContainer');
        let renderImage = makeEle.createEle('div','renderImage_'+(endCount - startCount), null,'renderImages');
        renderImage.style.background = 'url('+currentImage.link+') no-repeat';
        renderImage.startCount = startCount;
        renderImageContainer.append(renderImage);
        
        renderImage.addEventListener('click', () => {
          this.displayModal(currentImage);
        });

        imageResults.push(renderImageContainer);

      }
    }
    this.state.renderedImages = imageResults;
  }




  displayModal(picture) {
    let displayedModal = makeEle.createEle('div','displayModal', [12,12,12,12],'displayModalContainer');
    let displayPicture = makeEle.createEle('img','displayPicture', [12,12,12,12],'displayModalPicture');
    let pictureInfo = makeEle.createEle('div','picInfo',[12,12,12,12],'picInfo');

    displayPicture.src = picture.link;
    displayPicture.title = picture.description ? picture.description : '';
    displayedModal.append(displayPicture);






    document.querySelector('body').append(displayedModal);

    displayedModal.addEventListener('click', (e) => {
      if(e.target.classList.contains('displayModalContainer')) {
        displayedModal.remove();
      }
    })
  }





  changePage(pageTurn) {
    let currentPage = this.state.currentPage;
    let newImages = [];
    let loadedSet = false; 

    if(pageTurn) {
      if((currentPage + 1) >= this.state.totalPages ) {
        console.log('max page reached');

      } else {
        this.state.currentPage = currentPage + 1;
        this.imageSets(this.state.currentPage);


      }
    } else {
      if((currentPage-1) < 0) {
        console.log('first page reached');

      } else {
        this.state.currentPage = currentPage - 1;
        this.imageSets(this.state.currentPage);
   
      }
    }
    newImages = this.state.renderedImages;

    document.querySelector('#imageContainer').innerHTML = '';

    newImages.forEach((img, i) => {
       document.querySelector('#imageContainer').append(img);
    })
    
  }


  renderDiv(imageCount, ) {
    this.imageSets(this.state.currentPage);
    let carouselContainerWithControls = makeEle.createEle('div','carouselWrapper',[12,12,12,12],'carouselWrapper');

    let imageControlCount = Array(2).fill(null);
    let imageControl = [];

    let imageContainer = makeEle.createEle('div','imageContainer', null,'imageContainer');
    let imagesArray = this.state.renderedImages; 

    imageControlCount.forEach((ctr, i) => {
      let controlIcon = makeEle.createEle('div','controlIcon_'+i, null,'controlIcon');
      let leftOrRight = makeEle.createEle('div','imageControl_'+i,null,'imageControls');
       if(i == 0) {
        controlIcon.innerHTML = '<'; 
        if(this.state.currentPage == 0) {
          leftOrRight.classList.add('invalid');
        } else {
          leftOrRight.classList.remove('invalid');
        }
      } else {
        controlIcon.innerHTML = '>'; 
      }

      leftOrRight.addEventListener('click', (e) => {
         let currentPage = this.state.currentPage;
             
          if(i == 1) {
            this.changePage(true)
            document.querySelector('#imageControl_0').classList.remove('invalid');
            if((currentPage + 2) >= this.state.totalPages) {
              leftOrRight.classList.add('invalid');
            }
          } else {
            this.changePage(false);
            document.querySelector('#imageControl_1').classList.remove('invalid');
            if(this.state.currentPage == 0) {
              leftOrRight.classList.add('invalid');
            } else {
             leftOrRight.classList.remove('invalid'); 
            }
          }
      })


      /*

        Need to re-factor this cause it's too much repeating. 

        Will redo later. Rough draft first.


      */
      leftOrRight.append(controlIcon);
      imageControl.push(leftOrRight);

    })

    imagesArray.forEach((image, i) => {
      imageContainer.append(image);
    })

    carouselContainerWithControls.append(imageControl[0], imageContainer, imageControl[1]);

    return carouselContainerWithControls;

  }

}









function GalleryPage(galleryPics) {
  let imageResults;
  const galleryPageContainer = makeEle.createEle('div','galleryPageContainer',[12,12,12,12],['bodyContentItem','galleryPageContainer']);
  let galleryTitle = makeEle.createEle('div','galleryTitle',[12,12,12,12],'galleryTitle');
  let loadedState = false; 
  let state = {
    imageCount: 12,
    imageArray: [],

  }

  if(loadedState == false) {
    GetImgurData().then( res => {
      return res
    }).then( res => {
      imageResults = res.images;
        if(Array.isArray(imageResults)){
          loadedState != loadedState;
          let totalPages =  imageResults ? Math.floor(imageResults.length / state.imageCount) : 0;
          let galleryCarousel = new GalleryCarousel((state.imageCount), 0, imageResults);

          galleryTitle.innerHTML = `<div class='titleText'> <div class='text_1'>Real life drawings</div> <div class='text_2'> Check more out on my <a href='http://instagram.com/the_big_oh'> Instagram </a> </div> </div>`;

          galleryPageContainer.append(galleryTitle,galleryCarousel.renderDiv());
        }

    })
  }

  return galleryPageContainer;

}




export default GalleryPage;