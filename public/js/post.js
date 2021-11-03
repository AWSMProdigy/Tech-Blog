const postHandler = async (event) => {
    event.preventDefault();
    console.log("KEKW");
    const title = document.querySelector('#title-enter');
    const text = document.querySelector('#text-enter');

    if(title && text){
        const response = await fetch('/api/posts/', {
            method: 'POST',
            body: JSON.stringify({ title, text }),
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
