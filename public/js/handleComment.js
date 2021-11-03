const commentHandler = async (event) => {
    event.preventDefault();
    const text = document.querySelector('#text-enter').value.trim();
    const post_id = document.querySelector('#postID').innerHTML;
    alert(post_id);
    if(text){
        const response = await fetch('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({ author, post_id }),
            headers: { 'Content-Type': 'application/json' },
        })
        if (response.ok) {
            
        }
        else {
            alert("Failed to create comment");
        }
    }
    else {
        alert("Cannot create an empty comment");
    }

}


document
    .querySelector('.comment-form')
    .addEventListener('submit', commentHandler);