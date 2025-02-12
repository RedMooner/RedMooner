document.addEventListener('DOMContentLoaded', function() {
    const username = 'ВАШ_GITHUB_USERNAME'; // Замените на ваш GitHub username
    const reposList = document.getElementById('repos-list');

    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(repos => {
            repos.forEach(repo => {
                const listItem = document.createElement('li');
                const repoLink = document.createElement('a');
                repoLink.href = `https://${username}.github.io/${repo.name}`;
                repoLink.textContent = repo.name;
                repoLink.target = '_blank';

                const repoDescription = document.createElement('p');
                repoDescription.textContent = repo.description || 'Описание отсутствует';

                listItem.appendChild(repoLink);
                listItem.appendChild(repoDescription);
                reposList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Ошибка при загрузке репозиториев:', error);
            reposList.innerHTML = '<li>Не удалось загрузить репозитории.</li>';
        });
});
