export default class PostIt {

    container
    nom
    date
    type
    lieu
    left

    constructor(container,properties,left) {
        this.container = container
        this.nom = properties.nom
        this.date = properties.date
        this.type = properties.type
        this.lieu = properties.lieu
        this.left = left
        this.container.classList.add(this.left?'left-postit':'right-postit')
        this.render()
    }

    render() {
        this.container.innerHTML = `
        <div class="postit-container shadow show-on-scroll">
            <div class='postit-name'>${this.nom}</div>
            <div class='postit-date'>${this.date}</div>
            <img src="./src/ressources/img/icones/${this.type}.png" alt="${this.type}" class="icon">
            <div class='postit-lieu'>${this.lieu}</div>
        </div>
        `
    }

}