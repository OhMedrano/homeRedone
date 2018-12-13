import MakeElement from '../Tools/MakeElement.js';


const ProjectPage = function(projectsInfo){
  const makeEle = new MakeElement;


  let mainContent = makeEle.createEle('div','ProjectsPage',[12,12,12,12],'projectsPageContainer');
  let mainTitle = makeEle.createEle('div','projectsPageTitle',[12,12,12,12],'projectsPageTitle');



  mainTitle.innerHTML = `<div> <b>Projects I've worked on</b> </div>`



  mainContent.append(mainTitle);

  return mainContent;

}


export default ProjectPage;