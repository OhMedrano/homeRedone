import MakeElement from '../Tools/MakeElement.js';


const ProjectPage = function(projectsInfo){
  const makeEle = new MakeElement;


  let mainContent = makeEle.createEle('div','ProjectsPage',[12,12,12,12],['projectsPageContainer','bodyContainerItem']);
  let mainTitle = makeEle.createEle('div','projectsPageTitle',[12,12,12,12],'projectsPageTitle');
  let projectSwitchContainer = makeEle.createEle('div','projectSwitchButton', [12,12,12,12],'projectSwitchContainer');
  let projectsContainerSwitch = makeEle.createEle('div','projectContainerSwitch',[12,12,12,12],'projectContainerSwitch');
  let activeProject = 0;






  mainTitle.innerHTML = `<div> <b>Projects I've worked on</b> </div> `;

/*  projectSwitch.innerHTML = `<div id='projectSide' class='projectSwitchButton'>
                              For Work
                            </div>
                            <div id='projectSide' class='projectSwitchButton'>
                              For Fun
                            </div>

  `;
*/


  projectsInfo.forEach((projectType,i) => {
    let activeClass = (i == activeProject) ? 'active_project' : 'not_active';
    let projectSwitchButton = makeEle.createEle('div','projectSwitchButton_'+projectType.projectType,[6,6,6,6],['projectSwitchButton', 'projectButton_'+i,activeClass, 'switchControl']);
        projectSwitchButton.innerHTML = `<div class='typeName'>
                                             For ${projectType.projectType}
                                          </div>
                                          `;
    let projectSwitch = makeEle.createEle('div','projectContainer_'+projectType.projectType,[12,12,12,12],['projectSwitchContainers', 'projectContainer_'+i, activeClass, 'switchControl']);
/*    
    projectType.project.forEach((proj, x) => {
      console.log(proj);
      let projectItem = makeEle.createEle('a',`${projectType.projectType}_item_${proj.code}`,null, 'project');

      projectSwitch.append(projectItem);




    }) */


  /*  console.log(projectType);*/

    projectType.projects.forEach((proj, x) => {
  /*    console.log(proj);*/

      let projectItem = makeEle.createEle('a',`${projectType.projectType}_item_${proj.code}`, [12,5,6,6], 'projects');
      projectItem.innerHTML = `
            <div class='movableName'>
              <p> ${proj.name}</p>
            </div>


      `;
      projectItem.href = proj.url;
      projectItem.style.background = 'url(../../css/Assets/projectImages/'+proj.code+'.png) no-repeat';
      projectItem.style.backgroundSize = '100% 100%';


      projectSwitch.append(projectItem);


    })

    projectsContainerSwitch.append(projectSwitch);
    projectSwitchContainer.append(projectSwitchButton);
  


    projectSwitchButton.addEventListener('click', (event) => {
      console.log('sup clicked!');
      console.log(event);
      console.log(i);

      activeProject = i;


      let switchArray = Array.of(document.querySelectorAll('.switchControl'));

      switchArray[0].forEach((buttonClasses, i) => {
        console.log(buttonClasses);
        buttonClasses.classList.remove('active_project');
        buttonClasses.classList.add('not_active');
      })

      document.querySelector('.projectButton_'+activeProject).classList.remove('not_active');
      document.querySelector('.projectButton_'+activeProject).classList.add('active_project');       
 
      document.querySelector('.projectContainer_'+activeProject).classList.remove('not_active');
      document.querySelector('.projectContainer_'+activeProject).classList.add('active_project');       


    })




  })  





  mainContent.append(mainTitle, projectSwitchContainer, projectsContainerSwitch);

  return mainContent;

}


export default ProjectPage;