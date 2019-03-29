import MakeElement from '../Tools/MakeElement.js';
import email from '../../css/Assets/Icons/email.svg';
import github from '../../css/Assets/Icons/github.svg';
import linkedin from '../../css/Assets/Icons/linkedin.svg';
import instagram from '../../css/Assets/Icons/instagram.svg';

const TitlePage = function(PersonInfo) {
  const makeEle = new MakeElement;
  const svgArray = [email,linkedin,github,instagram]
  

  let mainContent = makeEle.createEle('div','titleMainContent',[12,12,12,12],['titleOuterContainer','bodyContainerItem']);
  let nameTitle = makeEle.createEle('div','titleName',[12,12,12,12],'titleName');
  let bioContent = makeEle.createEle('div','titleContentContainer',[12,12,12,12],'titleContent');
  let bioText = makeEle.createEle('div','titleContentText',[12,12,12,12],['titleContentContent', 'titleContentText']);
  let socialLinks = makeEle.createEle('div','titleSocialContainer',[12,12,12,12],['titleContentContent','titleSocialLinkContainer']);


  PersonInfo.name.forEach((name,i) => {
    let nameDiv = makeEle.createEle('div','titleNameDiv_'+i,[10,10,12,12],'titleNameDiv');
        nameDiv.innerHTML = name;

        nameTitle.append(nameDiv);
  })


  PersonInfo.contact.forEach((contact,i) => {

    let contactName = contact.name.toString().toLowerCase();

    let contactLink = makeEle.createEle('a','socialLink_'+contactName,[6,6,6,6],'socialLinks');
        contactLink.href = contact.link;
        contactLink.innerHTML = svgArray[i];

    socialLinks.append(contactLink);

  })

  bioText.innerHTML = `<div class='bioTextContent'> 
                          <div class='bioTextContentTop'>

                             <p>Hey! I'm <b>Oscar Medrano</b></p> 
                             <hr> 
                             <br/><p> A web developer who loves to draw and develop 
                                  interesting projects while focusing on clean code, 
                                  optimization and good design</p>
                          </div>

                          <div class='bioTextContentBottom'>
                              

                          </div>


                        </div>
    `;


  bioContent.append(bioText,socialLinks);

  mainContent.append(nameTitle,bioContent);

  return mainContent;
}

export default TitlePage;