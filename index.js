// get eletronics

function getEletronics() {
    return fetch('http://localhost:3000/eletronics')
    .then(res => res.json())
    .then((productsArr) => {
        productsArr.forEach((product) => {
            // console.log(product)
            const { id, name, image } = product
            const description = product["The Amiga is a family of personal computers introduced by Commodore in 1985. The original model was part of a wave of 16- and 32-bit computers that featured 256 KB or more of RAM, mouse-based GUIs, and significantly improved graphics and audio over 8-bit systems."]
            new Electronic(id, name, image, description)
        })
    })
}

getEletronics()



// // getReviews
function getReviews() {
    return fetch('http://localhost:3000/reviews')
        .then(res => res.json())
}
getReviews().then((usersArr) => {
    // console.log(eleArr)
    usersArr.forEach((userReview) => {
        const { id, name } = userReview
        const content = userReview["It's good"]
        new Review(id, name, content)
    })
})



























