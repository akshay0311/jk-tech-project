const API_URL = 'http://localhost:3002/posts'; // Endpoint

interface PostData {
  title: string;
  content: string;
  author: string;
}

const getHeader = () => {
  const token = localStorage.getItem("jwt");
  return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
  };
};


// 1. CREATE - Add a new post
export async function createPost(postData: PostData): Promise<any> {
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers : getHeader(),
      body: JSON.stringify(postData)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating post:', error);
  }
}




// 2. READ - Get all posts
export async function getPosts(): Promise<any> {
  const headers = getHeader();
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

// 3. UPDATE - Update a specific post
export async function updatePost(postId : number, updatedData : PostData) : Promise<any>{
  const headers = getHeader();
  try {
    const response = await fetch(`${API_URL}/${postId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(updatedData)
    });
    const data = await response.json();
    console.log('Post Updated:', data);
    return data;
  } catch (error) {
    console.error('Error updating post:', error);
  }
}

// 4. DELETE - Delete a specific post
export async function deletePost(postId : number) : Promise<any>{
  const headers = getHeader();
  try {
    const response = await fetch(`${API_URL}/${postId}`, {
      method: 'DELETE',
      headers
    });
    if (response.ok) {
      console.log(`Post with ID ${postId} deleted successfully.`);
    } else {
      console.error('Error deleting post');
    }
  } catch (error) {
    console.error('Error deleting post:', error);
  }
}
