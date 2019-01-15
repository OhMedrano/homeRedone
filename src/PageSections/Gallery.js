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



function galleryCarousel(imageContainer, imagesDisplayedDesktop, imagesDisplayedMobile) {
  const carouselContainer = makeEle.createEle('div','galleryCarouselParent', [12,12,12,12],'galleryCarouselContainer');


  let resultsImage = imageContainer.map((image,i) => {

    console.log(image);
  })

  resultsImage;






  return carouselContainer;


}



function GalleryPage(galleryPics) {
  let imageResults = [];
  const galleryPageContainer = makeEle.createEle('div','galleryPageContainer',[12,12,12,12],['bodyContentItem','galleryPageContainer']);

  GetImgurData().then(res => {
    res.images.forEach((imgurImage,i) => {
      imageResults.push(imgurImage);
    })
  }).then(() => {

    galleryPageContainer.append(galleryCarousel(imageResults, 8));



  })




  return galleryPageContainer;

}


export default GalleryPage;