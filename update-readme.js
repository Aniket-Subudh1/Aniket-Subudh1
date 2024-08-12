const fs = require('fs');
const axios = require('axios');

async function updateReadme() {
  const readmePath = './README.md';
  let readmeContent = fs.readFileSync(readmePath, 'utf8');

  // Fetch dynamic data
  const username = 'aniket-subudh1';
  const response = await axios.get(`https://api.github.com/users/${username}/repos`);
  const repos = response.data;

  // Count total stars and forks
  let stars = 0;
  let forks = 0;
  repos.forEach(repo => {
    stars += repo.stargazers_count;
    forks += repo.forks_count;
  });

  // Replace placeholders in README
  readmeContent = readmeContent.replace(/{{STARS}}/g, stars);
  readmeContent = readmeContent.replace(/{{FORKS}}/g, forks);

  fs.writeFileSync(readmePath, readmeContent, 'utf8');
  console.log('README updated successfully');
}

updateReadme();
