class Review {
    constructor(id, name, content) {
        this.id = id
        this.name = name
        this.content = content
        this.render()
        this.post()
        this.patch()
        this.delete()
    }

    // render() {
        
    //     let userComment = document.querySelector('.user-comment')
    //     let comment = document.querySelector('#comment')
    //     let commentDiv = document.createElement('div')

    //     commentDiv.classList.add('com-user')
    //     commentDiv.id = this.id

    //     commentDiv.innerHTML =
    //     `<h2>Create Comment</h2>
    //     <label>Name:</label>
    //     <br>
    //     <input type="text" name="name">
    //     <br>
    //     <label>Comment:</label>
    //     <br>
    //     <textarea name="comment" id="comment-name" cols="10" rows="9"></textarea>
    //     <br>
    //     <button class='button-submit' data-id=${this.id}>Submit</button>`

    //     userComment.innerHTML = ""

    //     userComment.append(commentDiv)

    //     comment.innerHTML += 
    //     `<div id = "review-${this.id}">
    //         <div>name: ${this.name}</div>
    //         <div>comment: ${this.content}</div> 
    //         <button data-id=${this.id} class='clear' id='delete'>delete</button> 
    //         <input type='text'> <button data-id=${this.id} class='re-due' id='edit'>edit</button>
    //     </div>`

    // }


    render() {

        //add event listner 
        let itemButton = document.querySelector(".list-group")
        itemButton.addEventListener('click', (evt) => {
            // debugger
            fetchReview(evt.target)
        })

        //fetchReview
        function fetchReview(reviewForm) {
            // debugger
            fetch(`http://localhost:3000/eletronics/${reviewForm.id}`)
            .then(res => res.json())
            .then((comment) => {
                // debugger   

                // console.log(comment);
                let userComment = document.querySelector(".user-comment")
                let user = document.querySelector("#comment")
                let label = document.createElement('label')
                let label2 = document.createElement('label')
                let input = document.createElement('input')
                let textarea = document.createElement('textarea')
                let button = document.createElement('button')
                let h2 = document.createElement('h2')
                let br = document.createElement('br')
                let br2 = document.createElement('br')
                let br3 = document.createElement('br')
                let br4 = document.createElement('br')
                let br5 = document.createElement('br')

                input.setAttribute('type', 'text')
                input.setAttribute('name', 'name')
                textarea.setAttribute('name', 'comment')
                textarea.setAttribute('id', 'comment-name')
                button.setAttribute('class', 'button-submit')
                button.setAttribute('data-id', comment.id)
                userComment.setAttribute('id', comment.id)

                label.innerText = 'Name:'
                label2.innerText = 'Comment:'
                button.innerText = 'submit'
                h2.innerText = 'Create Comment'
                userComment.innerText = ''
                
                userComment.append(h2, label, br4, input, br, label2, br2, textarea, br3, br5, button)
                
                comment.reviews.forEach(review => {
                    userComment.innerHTML +=
                    `<div id = "review-${review.id}">
                    <div>name: ${review.name}</div>
                    <div>comment: ${review.content}</div> 
                    <button data-id=${review.id} class='clear' id='delete'>delete</button> 
                    <input type='text'> <button data-id=${review.id} class='re-due' id='edit'>edit</button>
                    </div>`
                })
            })
        }

    }

    post() {
        let submitButton = document.querySelector(".user-comment")
        submitButton.addEventListener('submit', (evt) => {
            // debugger
            evt.preventDefault()
            postComment(evt.target)
        })

        function postComment(commentInfo) {
            // debugger
            // console.log(commentInfo.comment.value)
            fetch(`http://localhost:3000/reviews`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: commentInfo.name.value,
                    content: commentInfo.comment.value,
                    eletronic_id: commentInfo.id
                })
            })
            .then(res => res.json())
            .then((user) => {
                // debugger
                let reviewRev = document.querySelector('.user-comment')

                reviewRev.innerHTML +=
                `<div id = "review-${user.id}">
                    <div>name: ${user.name}</div>
                    <div>comment: ${user.content}</div> 
                    <button data-id=${user.id} class='clear' id='delete'>delete</button> 
                    <input type='text'> <button data-id=${user.id} class='re-due' id='edit'>edit</button>
                    <br>
                </div>`
            })
            submitButton.reset()
        }
    }

    patch() {
        let reviewRev = document.querySelector('.user-comment')
        reviewRev.addEventListener("click", (e) => {
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
                        // debugger
                        e.target.parentElement.children[1].innerText = `comment: ${newReview.content}`
                    })
            }
        })
    }

    delete() {
        let rCollect = document.querySelector('.user-comment')
        rCollect.addEventListener("click", (e) => {
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
    }


}




















