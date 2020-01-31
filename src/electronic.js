class Electronic {
    constructor(id, name, image, description) {
        this.id = id
        this.name = name
        this.image = image
        this.description = description
        this.render()
        this.info()
    }

    render(){
        let itemCollection = document.getElementById('list-group')
        let itemLi = document.createElement('li')

        itemLi.classList.add('list-group-item')
        itemLi.id = this.id

        //inner text
        itemLi.innerHTML = this.name

        //append
        itemCollection.append(itemLi)
    }

    info(){
        let itemButton = document.getElementById(`${this.id}`)
        itemButton.addEventListener('click', (evt) => {
            // debugger
            fetchItem(evt.target)
        })


        function fetchItem(itemInfo) {
            // debugger 
            fetch(`http://localhost:3000/eletronics/${itemInfo.id}`)
            .then(res => res.json())
            .then((product) => {
                let productDetail = document.getElementById('item-detail')
                let h1 = document.createElement('h1')
                let img = document.createElement('img')
                let p = document.createElement('p')
                let h2 = document.createElement('h2')
                let br7 = document.createElement('br')

                img.setAttribute('src', product.image)

                h1.innerText = product.name
                p.innerText = product.description
                h2.innerText = 'Item Detail'
                // erase.innerText = 'delete'
                productDetail.innerText = ""

                productDetail.append(h2, h1, img, br7, p)

            })
        }
    }

}
