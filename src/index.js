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

  console.log(body, Data);

  let makeEle = new MakeElement;

  let bodyContainer = makeEle.createEle('div','bodyContainer',[12,12,12,12],'bodyContain');  
  bodyContainer.append(TitlePage(Data.person), ProjectsPage(Data.projects));
  body.append(bodyContainer);
}

RenderSite(); 