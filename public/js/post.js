const postHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#title-enter').value.trim();
    const text = document.querySelector('#text-enter').value.trim();
    const author = document.querySelector('#userName').innerHTML;

    if(title && text){
        const response = await fetch('/api/posts/', {
            method: 'POST',
            body: JSON.stringify({ author, title, text }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            
        }
        else {
            alert("Failed to create post");
        }
    }
}


document
    .querySelector('.post-form')
    .addEventListener('submit', postHandler);
