const fs = require('fs');

// Read the contents of the .env file
const envFile = fs.readFileSync('.env', 'utf8');

// Parse the contents to extract the variable
const matches = envFile.match(/GITHUB_TOKEN=(.*)/);

// Check if the variable exists in the .env file
if (matches && matches[1]) {
    const token = matches[1];
    console.log('GitHub Token:', token);

    // Now you can use the token in your code
    // For example:
    // const github = new GitHub({ token });
} else {
    console.error('GitHub Token not found in .env file');
}

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

        const token = process.env.GITHUB_PAT; // Replace with your GitHub Personal Access Token
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
