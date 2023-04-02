// Handle form submission
require('dotenv').config();

document.getElementById("addCollaboratorsForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    // Get repository owner, repository name, and personal access token
    const repoOwner = "devignx";
    const repoName = "shipcrew";
    const token = process.env.ACCESS_TOKEN;

  
    // Get collaborators' email addresses from input fields
    const collaborator1 = document.getElementById("collaborator1").value;
  
    // Add collaborators to the repository using GitHub API
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/collaborators`;
    const headers = {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/vnd.github.v3+json"
    };
    const data = {
      "collaborators": [collaborator1],
      "permission": "write"
    };
    fetch(apiUrl, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.status === 201) {
        console.log("Collaborators added successfully");
      } else {
        console.log("Failed to add collaborators");
      }
    })
    .catch(error => {
      console.log("An error occurred: ", error);
    });
  });
  