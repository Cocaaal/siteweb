import Caroussel from "./js/Caroussel.js";
import Projet from "./js/Projet.js";
import PostIt from "./js/PostIt.js";

document.addEventListener("DOMContentLoaded", function(event) { 
    
    console.log('OK')
    
    fetch('src/ressources/json/data.json').then(response => {
        response.json().then(json => {
            const caroussel = new Caroussel(document.querySelector(".caroussel-container"),json.projets.length)
            loadProjects(caroussel.getChildren(),json)
            loadPostIt(json)
            caroussel.setFocusedItem(caroussel.currentItem)
        })
    })
    
    let showableElements = [...document.querySelectorAll('.show-on-scroll')]
    //console.log(showableElements)
    checkIfElementsAreVisible(showableElements)

    window.addEventListener('scroll',() => {
        document.querySelectorAll(".inner-top-border").forEach(el => {
            el.style.backgroundPosition = (window.scrollY*20/window.innerHeight) + '% 0%'
        })
        document.querySelector(".inner-bottom-border").style.backgroundPosition = '-' + (window.scrollY*20/window.innerHeight) + '% 0%'
        let showableElements = [...document.querySelectorAll('.show-on-scroll')]
        //console.log(showableElements)
        checkIfElementsAreVisible(showableElements)
    });

    document.querySelector('.carte-postale-photo').addEventListener('click', () => {
        let cartepostale = document.querySelector('.carte-postale')
        if (cartepostale.classList.contains('recto')) {
            cartepostale.classList.remove('recto')
            cartepostale.classList.add('verso')
            setTimeout(cartepostale => {
                cartepostale.classList.remove('verso')
                cartepostale.classList.add('recto')
            },2000,cartepostale)
        }
    })


});

function loadProjects(elements, json) {
    let i=0
    elements.forEach(element => {
        new Projet(element, json.projets[i])
        i=i+1
    })
}

function loadPostIt(json) {
    let experienceSection = document.querySelector('.postit-list-container')
    let left = true;
    for (let i=0; i<json.experience.length; i++) {
        let postit = document.createElement('div')
        postit.setAttribute('class','postit-item')
        experienceSection.appendChild(postit)
        new PostIt(postit, json.experience[i], left)
        left = !left
    }

}

function checkIfElementsAreVisible(elements) {
    const pageBottom = window.scrollY + window.innerHeight
    elements.forEach(el => {
        const rect = el.getBoundingClientRect()
        const elTop = rect.top + window.scrollY
        if (elTop <= pageBottom) {
            el.classList.remove('show-on-scroll')
            el.classList.add('showed')
        }
    })
}