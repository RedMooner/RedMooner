document.addEventListener('DOMContentLoaded', function() {
    const username = 'Redmooner'; // Замените на ваш GitHub username
    const reposList = document.getElementById('repos-list');
    const docsList = document.getElementById('docs-list');
    const searchInput = document.getElementById('search-repos');

    let allRepos = [];

    // Получаем репозитории
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(repos => {
            allRepos = repos;
            renderRepos(repos);
            renderDocs(repos);
        })
        .catch(error => {
            console.error('Ошибка при загрузке репозиториев:', error);
            reposList.innerHTML = '<li>Не удалось загрузить репозитории.</li>';
        });

    // Поиск репозиториев
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredRepos = allRepos.filter(repo => repo.name.toLowerCase().includes(searchTerm));
        renderRepos(filteredRepos);
    });

    // Рендер всех репозиториев
    function renderRepos(repos) {
        reposList.innerHTML = '';
        repos.forEach(repo => {
            const listItem = document.createElement('li');
            const repoHeader = document.createElement('div');
            repoHeader.classList.add('repo-header');
            const repoTitle = document.createElement('h3');
            repoTitle.textContent = repo.name;
            repoTitle.addEventListener('click', () => toggleAccordion(listItem));

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

            const repoLink = document.createElement('a');
            repoLink.href = `https://${username}.github.io/${repo.name}`;
            repoLink.textContent = 'Открыть страницу';
            repoLink.classList.add('repo-link');
            repoLink.target = '_blank';

            repoHeader.appendChild(repoTitle);
            repoDetails.appendChild(repoDescription);
            repoDetails.appendChild(repoTags);
            repoDetails.appendChild(repoLink);
            listItem.appendChild(repoHeader);
            listItem.appendChild(repoDetails);
            reposList.appendChild(listItem);
        });
    }

    // Рендер репозиториев с тегом docs
    function renderDocs(repos) {
        docsList.innerHTML = '';
        repos.forEach(repo => {
            if (repo.topics && repo.topics.includes('docs')) {
                const docItem = document.createElement('li');
                const docHeader = document.createElement('div');
                docHeader.classList.add('doc-header');
                const docTitle = document.createElement('h3');
                docTitle.textContent = repo.name;

                const docDetails = document.createElement('div');
                docDetails.classList.add('doc-details', 'open'); // Всегда открыт
                const docDescription = document.createElement('p');
                docDescription.textContent = repo.description || 'Описание отсутствует';

                const docTags = document.createElement('div');
                docTags.classList.add('doc-tags');
                repo.topics.forEach(topic => {
                    const tag = document.createElement('span');
                    tag.textContent = `#${topic}`;
                    docTags.appendChild(tag);
                });

                const docLink = document.createElement('a');
                docLink.href = `https://${username}.github.io/${repo.name}`;
                docLink.textContent = 'Открыть страницу';
                docLink.classList.add('doc-link');
                docLink.target = '_blank';

                docHeader.appendChild(docTitle);
                docDetails.appendChild(docDescription);
                docDetails.appendChild(docTags);
                docDetails.appendChild(docLink);
                docItem.appendChild(docHeader);
                docItem.appendChild(docDetails);
                docsList.appendChild(docItem);
            }
        });
    }

    // Анимация аккордеона
    function toggleAccordion(item) {
        const details = item.querySelector('.repo-details');
        details.classList.toggle('open');
    }
});