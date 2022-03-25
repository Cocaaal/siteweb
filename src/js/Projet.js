export default class Projet {
    
    element
    properties
    title
    description
    image
    icons
    informations

    constructor(element, properties = {}) {
        this.element = element
        this.title = properties.title
        this.description = properties.description
        this.icons = properties.icons
        this.image = properties.image
        this.informations = properties.informations
        this.render()
    }

    render() {
        this.element.innerHTML = `
        <div class="projet shadow">
            <div class="projet-content">
                <h2 class="projet-titre">${this.title}</h2>
                <p class="projet-description">${this.description}</p>
                <p class="projet-informations">${this.informations}</p>
                <div class="projet-icones">${this.renderIcons()}</div>
            </div>
        </div>`
    }
    renderIcons() {
        if (!this.icons) return ""
        let res = ""
        this.icons.forEach(icon => {
            res = `${res} <img src="./src/ressources/img/icones/${icon}.png" alt="${icon}" class="icon">`
        });
        return res
    }

}