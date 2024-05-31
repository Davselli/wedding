function fetchEnvFile(callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                callback(null, xhr.responseText);
            } else {
                callback(new Error('Failed to fetch .env file'));
            }
        }
    };
    xhr.open('GET', '.env', true);
    xhr.send();
}

// Usage example
fetchEnvFile(function(error, envContents) {
    if (error) {
        console.error(error);
        return;
    }

    // Extract the variable
    const token = envContents.trim(); // Trim to remove leading/trailing whitespace

    // Use the token in your code
    console.log('GitHub Token:', token);
});

document.getElementById('uploadButton').addEventListener('click', async () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) {
        alert('Please select a file!');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = async (event) => {
        const content = event.target.result.split(',')[1]; // Get the base64 content
        const filename = file.name;

        const token = envContents.trim(); // Replace with your GitHub Personal Access Token
        const repoOwner = 'Davselli'; // Replace with your GitHub username
        const repoName = 'pic_wedding'; // Replace with your repository name
        const branchName = 'main'; // Replace with the branch you want to upload to
        const path = `uploads/${filename}`; // Path where the file will be uploaded

        // Check if the file already exists
        const getFileResponse = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`, {
            headers: {
                'Authorization': `token ${token}`
            }
        });

        let sha = null;
        if (getFileResponse.ok) {
            const fileData = await getFileResponse.json();
            sha = fileData.sha; // Get the sha of the existing file
        }

        // Create or update the file
        const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: `Add ${filename}`,
                content: content,
                branch: branchName,
                sha: sha // Include sha if updating an existing file
            })
        });

        if (response.ok) {
            alert('File uploaded successfully!');
        } else {
            alert('Error uploading file');
            console.error(await response.json());
        }
    };

    reader.readAsDataURL(file);
});

document.getElementById('customFileInput').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('fileInput').click();
});
