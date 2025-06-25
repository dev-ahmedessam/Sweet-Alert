const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
const form = document.getElementById('post-form');
const titleInput = document.getElementById('title');
const bodyInput = document.getElementById('body');
const postList = document.getElementById('post-list');

// GET: Read posts
async function fetchPosts() {
  const res = await fetch(apiUrl);
  
  const posts = await res.json();

  postList.innerHTML = ''; // Clear old posts

  // Show newest posts first
  posts.slice(0, 10).forEach(post => {
    const li = document.createElement('li');
    li.className = 'post-item';

    li.innerHTML = `
      <h3>postId ${post.id}</h3>
      <h3>${post.title}</h3>
      <p>${post.body.replace(/\n/g, '<br>')}</p>
      <div class="actions">
        <button onclick="editPost(${post.id}, \`${post.title}\`, \`${post.body}\`)">Edit</button>
        <button onclick="deletePost(${post.id})">Delete</button>
      </div>
    `;

    postList.appendChild(li);
  });
}


// POST: Create new post
form.addEventListener('submit', async (e) => {
  e.preventDefault();
debugger
  const ress = await fetch(apiUrl);
  const posts = await ress.json();

  // Step 2: Find the highest userId from existing posts
  const maxUserId = Math.max(...posts.map(post => post.userId));

  // Step 3: Create new post with userId = max + 1
  const newPost = {
    title: titleInput.value.trim(),
    body: bodyInput.value.trim(),
    userId: maxUserId + 1
  };

  if (!newPost.title || !newPost.body) {
    alert('Please enter both title and body.');
    return;
  }

  const res = await fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(newPost),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await res.json();
  //alert('Post created: ID ' + data.id);
    showAlert()
  // Clear form and focus title input
  form.reset();
  titleInput.focus();

  fetchPosts(); // Refresh list
});

// PATCH: Edit post
function editPost(id, oldTitle, oldBody) {
  const newTitle = prompt('Edit title:', oldTitle);
  const newBody = prompt('Edit body:', oldBody);

  if (!newTitle || !newBody) return;

  fetch(`${apiUrl}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ title: newTitle, body: newBody }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log('Updated:', data);
      fetchPosts();
    });
}

// DELETE: Remove post
function deletePost(id) {
  if (!confirm('Are you sure you want to delete this post?')) return;

  fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  }).then(() => {
    alert('Post deleted (fake)');
    fetchPosts();
  });
}

// Load posts on page load
fetchPosts();


  function showAlert() {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
         saveData()

        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  saveData()