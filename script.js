document.addEventListener('DOMContentLoaded', function() {
    const username = 'Redmooner'; // Замените на ваш GitHub username
    const reposList = document.getElementById('repos-list');
    const docsList = document.getElementById('docs-list');

    // Получаем репозитории
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(repos => {
            repos.forEach(repo => {
                // Создаем элемент для репозитория
                const listItem = document.createElement('li');
                const repoHeader = document.createElement('div');
                repoHeader.classList.add('repo-header');
                const repoTitle = document.createElement('h3');
                repoTitle.textContent = repo.name;
                repoTitle.addEventListener('click', () => {
                    const details = listItem.querySelector('.repo-details');
                    details.style.display = details.style.display === 'block' ? 'none' : 'block';
                });

                const repoDetails = document.createElement('div');
                repoDetails.classList.add('repo-details');
                const repoDescription = document.createElement('p');
                repoDescription.textContent = repo.description || 'Описание отсутствует';

                const repoTags = document.createElement('div');
                repoTags.classList.add('repo-tags');
                if (repo.topics && repo.topics.length > 0) {
                    repo.topics.forEach(topic => {
                        const tag = document.createElement('span');
                        tag.textContent = `#${topic}`;
                        repoTags.appendChild(tag);
                    });
                } else {
                    const noTags = document.createElement('span');
                    noTags.textContent = 'Нет тегов';
                    repoTags.appendChild(noTags);
                }

                repoHeader.appendChild(repoTitle);
                repoDetails.appendChild(repoDescription);
                repoDetails.appendChild(repoTags);
                listItem.appendChild(repoHeader);
                listItem.appendChild(repoDetails);
                reposList.appendChild(listItem);

                // Фильтруем репозитории с тегом docs
                if (repo.topics && repo.topics.includes('docs')) {
                    const docItem = document.createElement('li');
                    const docHeader = document.createElement('div');
                    docHeader.classList.add('doc-header');
                    const docTitle = document.createElement('h3');
                    docTitle.textContent = repo.name;
                    docTitle.addEventListener('click', () => {
                        const details = docItem.querySelector('.doc-details');
                        details.style.display = details.style.display === 'block' ? 'none' : 'block';
                    });

                    const docDetails = document.createElement('div');
                    docDetails.classList.add('doc-details');
                    const docDescription = document.createElement('p');
                    docDescription.textContent = repo.description || 'Описание отсутствует';

                    const docTags = document.createElement('div');
                    docTags.classList.add('doc-tags');
                    repo.topics.forEach(topic => {
                        const tag = document.createElement('span');
                        tag.textContent = `#${topic}`;
                        docTags.appendChild(tag);
                    });

                    docHeader.appendChild(docTitle);
                    docDetails.appendChild(docDescription);
                    docDetails.appendChild(docTags);
                    docItem.appendChild(docHeader);
                    docItem.appendChild(docDetails);
                    docsList.appendChild(docItem);
                }
            });
        })
        .catch(error => {
            console.error('Ошибка при загрузке репозиториев:', error);
            reposList.innerHTML = '<li>Не удалось загрузить репозитории.</li>';
        });
});