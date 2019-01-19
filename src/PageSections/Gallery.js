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



/*function galleryCarousel(imageContainer, imagesDisplayedDesktop, currentPage) {
  const carouselContainer = makeEle.createEle('div','galleryCarouselParent', [12,12,12,12],'galleryCarouselContainer');
  let results = Array(imagesDisplayedDesktop).fill(null);
  let offset = imagesDisplayedDesktop * currentPage;
  console.log(results);










  return carouselContainer;


}*/




class GalleryCarousel {
  constructor(imageCount, currentPage, images) {
    this.state = {
      currentCount: imageCount,
      currentPage: currentPage? currentPage : 0,
      totalPages: images ? Math.floor(images.length / imageCount) : 0,
      images: images ? images : [],
      renderedImages: [],
    }
    this.changePage = this.changePage.bind(this);
  }


  imageSets(currentPage) {
    let startCount = this.state.currentCount * currentPage; 
    let endCount = startCount + this.state.currentCount;
    let imageResults = [];
    for(startCount; startCount <= endCount; startCount++) {
      let currentImage = this.state.images[startCount];
      console.log(currentImage,startCount);
      if(startCount >= this.state.images.length) {
        console.log('No image exist');
      } else {       
        let renderImageContainer = makeEle.createEle('div','renderImageContainer_'+(endCount - startCount), [12,12,12,3], 'renderImageContainer');
        let renderImage = makeEle.createEle('div','renderImage_'+(endCount - startCount), null,'renderImages');
        renderImage.style.background = 'url('+currentImage.link+') no-repeat';
        renderImageContainer.append(renderImage);
        imageResults.push(renderImageContainer);

      }
    }
    this.state.renderedImages = imageResults;
  }






  changePage(pageTurn) {
    let currentPage = this.state.currentPage;
    if(pageTurn) {
      if((currentPage + 1) > this.state.totalPages ) {
        console.log('max page reached');
      } else {
        this.state.currentPage = currentPage + 1;
        this.imageSets(this.state.currentPage);
      }
    } else {
      if((currentPage - 1) < 0) {
        console.log('first page reached');
      } else {
        this.state.currentPage = currentPage - 1;
        this.imageSets(this.state.currentPage);
      }
    }
    this.rerender();
  }


  rerender() {
    this.renderDiv();
  }

  renderDiv(imageCount, ) {
    console.log(this.state);
    this.imageSets(this.state.currentPage);
    let carouselContainerWithControls = makeEle.createEle('div','carouselWrapper',[12,12,12,12],'carouselWrapper');

    let imageControlCount = Array(2).fill(null);
    let imageControl = [];

    let imageContainer = makeEle.createEle('div','imageContainer', null,'imageContainer');
    let imagesArray = this.state.renderedImages; 

    imageControlCount.forEach((ctr, i) => {

      let leftOrRight = makeEle.createEle('div','imageControl_'+i,null,'imageControls');
      leftOrRight.addEventListener('click', (e) => {
         let currentPage = this.state.currentPage;
          if(i == 1) {
            this.changePage(true)
          } else {
            this.changePage(false);
          }
      })
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
  let loadedState = false; 
  let state = {
    imageCount: 8,
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
          let galleryCarousel = new GalleryCarousel(7, 0, imageResults);        
          galleryPageContainer.append(galleryCarousel.renderDiv());
        }

    })
  }
  




  return galleryPageContainer;

}




export default GalleryPage;