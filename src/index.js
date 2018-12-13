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

function RenderSite(){
  let body = document.querySelector('body');

  let date = new Date();
  let hours = date.getHours();
  let modeChange = (hours > 8 && hours < 18) ? 'day_man' : 'night_man'; // AAAAAaaaaaaaAAAAAhhhh 

  let makeEle = new MakeElement;

  let bodyContainer = makeEle.createEle('div','bodyContainer',[12,12,12,12],['bodyContain', modeChange]);  
  bodyContainer.append(TitlePage(Data.person), ProjectsPage(Data.projects));
  body.append(bodyContainer);
}

RenderSite(); 