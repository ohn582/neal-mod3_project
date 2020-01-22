// get eletronics

function getEletronics() {
    return fetch('http://localhost:3000/eletronics')
    .then(res => res.json())
    .then((productsArr) => {
        productsArr.forEach((product) => {
            // console.log(product)
            const { id, name, image, description} = product
            new Electronic(id, name, image, description)
        })
    })
}

getEletronics()


// // getReviews
function getReviews() {
    return fetch('http://localhost:3000/reviews')
    .then(res => res.json())
    .then((userReview) => 
        userReview.forEach(user =>{
            // console.log(user)
            const { id, name, content } = user
            new Review(id, name, content)
        })
    )
}

getReviews()


























