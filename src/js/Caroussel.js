const ONE_ELEMENT_SIZE = 400;
const TWO_ELEMENTS_SIZE = 768;
const THREE_ELEMENTS_SIZE = 768;

export default class Caroussel {


    container
    carousselElement
    nbItemsVisibles
    nbItems
    children
    currentItem

    constructor(container, nbItems) {
        this.container = container
        this.carousselElement = this.createDiv('caroussel')
        this.container.appendChild(this.carousselElement)
        this.nbItems = nbItems
        const tmp = Math.trunc(window.innerWidth/400)+1
        if (tmp<this.nbItems) {
            this.nbItemsVisibles = tmp
        }else{
            this.nbItemsVisibles = this.nbItems-1
        }
        this.createCarousselItems()
        this.children = [...this.carousselElement.children]
        this.resizeCaroussel()
        this.currentItem = Math.trunc(this.nbItemsVisibles/2)
        this.createNextAndPreviousArrow()
        window.addEventListener('resize', () => this.onResize())
    }

    createDiv(classname) {
        let div = document.createElement('div')
        div.setAttribute('class', classname)
        return div
    }

    createCarousselItems() {
        for (let i=0; i<this.nbItems; i++) {
            let carousselItem = this.createDiv('caroussel-item')
            carousselItem.addEventListener('click', event => this.setFocusedItem(i))
            this.carousselElement.appendChild(carousselItem)
        }
    }

    createNextAndPreviousArrow() {
        let next = this.container.appendChild(this.createDiv("caroussel-next"))
        let prev = this.container.appendChild(this.createDiv("caroussel-prev"))
        next.addEventListener('click', event => this.next())
        prev.addEventListener('click', event => this.prev())
    }

    next() {
        this.setFocusedItem((this.currentItem+1)%this.nbItems)
    }

    prev() {
        if (this.currentItem==0) {
            this.setFocusedItem(this.nbItems-1)
        }else{
            this.setFocusedItem(this.currentItem-1)
        } 
    }

    setFocusedItem(index) {
        //console.log('FOCUS '+index)
        const translateX = (index-(Math.trunc((this.nbItemsVisibles-1)/2))) * (-100/this.nbItems) + '%'
        //console.log('translateX : '+translateX)
        this.carousselElement.style.transform = 'translateX('+translateX+')'
        //console.log(this.children[this.currentItem])
        this.children[this.currentItem].firstElementChild.classList.remove('focused')
        this.currentItem = index
        this.children[this.currentItem].firstElementChild.classList.add('focused')
    }

    resizeCaroussel() {
        this.carousselElement.style.width = (this.children.length*100/this.nbItemsVisibles)+'%'
        this.children.forEach(child => {
            child.style.width = (1/this.children.length*100)+'%'
        })
    }

    setNbItemsVisibles(nb) {
        this.nbItemsVisibles = nb;
        this.resizeCaroussel();
        this.setFocusedItem(this.currentItem)
    }

    getChildren() {
        return this.children
    }

    onResize() {
        const nbItemsOpti = Math.trunc(window.innerWidth/400)+1
        if (nbItemsOpti < this.nbItems) {
            //console.log(nbItemsOpti)
            this.setNbItemsVisibles(nbItemsOpti)
        }
    }

}