// Global variables
let books = document.getElementById("books")
let bookShow = document.getElementById("discription")


// allows to show all list of books
fetch("http://localhost:3000/books")
.then(response => response.json())
.then((booksArr) => {
    booksArr.forEach(book => {
        let bookUl = document.createElement("ul")
        bookUl.innerHTML = `<div class="column" style="background-color:#aaa;"><center>
        <img src=${book.image} width="200" height="300">
        <h3>${book.title}</h3>
        <button id="mybutton" data-id="${book.id}">Details</button>
        </div>
        </center>`
        books.append(bookUl)
    })
    renderBook()
})


// renders a book when clicked
function renderBook(){
    books.addEventListener("click", (evt) => {
        // debugger
        if (evt.target.id === "mybutton") {
            let id = evt.target.dataset.id
            fetch(`http://localhost:3000/books/${id}`)
            .then(response => response.json())
            .then((book) => {
                // debugger
                // bookShow.innerHTML = ""
                bookShow.innerHTML += 
                `<div style="background-color:#666;">
                <center>
                <h1 data-id="${book.id}">${book.title}</h1>
                <img src="${book.image}" width="200" height="300">
                </center>
                <h3>Description:</h3>
                <p>${book.description}</p>
                <br>
                <h3>Reviews:</h3>
                <div id="reviews"></div>
                <br>
                <br>
                <form class="create">
                    <label for="name">name:</label>
                    <input type="text" name="name">
                    <br>
                    <br>
                    <label for="content">content:</label>
                    <input type="text" name="content">
                    <button>Submit</button>
                </form>
                <br>
                </div>` 
            
                
               //create a review
                let reviewCreate = document.querySelector(".create")
                reviewCreate.addEventListener("submit", (evt) => {
    
                    evt.preventDefault();
                    let newName = evt.target.name.value
                    let newContent = evt.target.content.value
                
                    fetch(`http://localhost:3000/reviews`, {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify({
                            name: newName,
                            content: newContent,
                            book_id: parseInt(id)
                        })
                    })
                    .then(r => r.json())
                    .then(reviewsArr => {
                        if (reviewsArr.errors) {
                            alert("Fields cannot be blank")
                        } else {
                            let reviewRev = document.getElementById("reviews")
                
                            reviewRev.innerHTML += `
                                <div id="review-${reviewsArr.id}"
                                <p>${reviewsArr.name}</p>
                                <p>${reviewsArr.content}</p>
                                <button id='delete'>Delete</button>
                                <input type='text'>
                                <button id='edit'>Edit</button>
                                </div>`
                            reviewCreate.reset()
                        }
                    })
                })
                let reviewRev1 = document.getElementById("reviews")
                book.reviews.forEach((review) => {
                    reviewRev1.innerHTML +=
                        `<div id="review-${review.id}"
                            <p>${review.name}</p> 
                            <p>${review.content}</p>
                            <button data-id=${review.id} id='delete'>Delete</button>
                            <input type='text'>
                            <button data-id=${review.id} id='edit'>Edit</button>
                        </div>`
                })
    
                // delete a review
                reviewRev1.addEventListener("click", (e) => {
                    // debugger
                    let id = e.target.dataset.id
                    if (e.target.id === "delete") {
                        fetch(`http://localhost:3000/reviews/${id}`, {
                            method: "DELETE"
                        })
                        .then(() => {
                            e.target.parentElement.remove()
                        })
                    } 
                })
    
                //updating your content review
                reviewRev1.addEventListener("click", (e) => {
                    // debugger
                    let editContent = e.target.previousElementSibling.value
                    let id = e.target.dataset.id
                    if (e.target.id === "edit") {
                        fetch(`http://localhost:3000/reviews/${id}`, {
                            method: "PATCH",
                            headers: {
                                "Content-type": "application/json",
                                "Accept": "application/json"
                            },
                            body: JSON.stringify({
                                content: editContent
                            })
                        })
                        .then(response => response.json())
                        .then((newReview) => {
                            debugger
                            e.target.parentElement.children[1].innerText = newReview.content
                            
                        })
                    }
                })
            })   
        }
    })
}




