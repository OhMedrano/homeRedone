/*
  Tools and style imports
*/
import '../css/style.scss';
import MakeElement from './Tools/MakeElement.js';
import Data from './Data/Data.js';

/*
  Page Sections imports 
*/

import TitlePage from './PageSections/title.js';
import ProjectsPage from './PageSections/projects.js';
import GalleryPage from './PageSections/Gallery.js';

function GetImgurData() {
  const albumId = '5b1Iw74';
  const imgurUrl = 'https://api.imgur.com/3/album/'+ albumId;
  const apiKey = 'd79980c38438700';

  fetch(imgurUrl, {
    headers: {
      'Authorization': 'Client-ID ' + apiKey,
    }
  }).then(res => {
    console.log(res);
    return res.json();
  }).then(res => {
    return res
  })

}



function RenderSite(){
  let body = document.querySelector('body');

  let date = new Date();
  let hours = date.getHours();
  let modeChange = (hours > 8 && hours < 18) ? 'day_man' : 'night_man'; // AAAAAaaaaaaaAAAAAhhhh 

  let makeEle = new MakeElement;

  let bodyContainer = makeEle.createEle('div','bodyContainer',[12,12,12,12],['bodyContain', modeChange]);  
  bodyContainer.append(TitlePage(Data.person), ProjectsPage(Data.projects), GalleryPage());
  body.append(bodyContainer);



}

RenderSite(); 