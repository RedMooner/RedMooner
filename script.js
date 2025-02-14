document.addEventListener('DOMContentLoaded', function() {
    const username = 'Redmooner'; // Замените на ваш GitHub username
    const reposList = document.getElementById('repos-list');
    const docsList = document.getElementById('docs-list');
    const searchReposInput = document.getElementById('search-repos');
    const searchDocsInput = document.getElementById('search-docs');

    const followersElement = document.getElementById('followers');
    const followingElement = document.getElementById('following');
    const locationElement = document.getElementById('location');
    const localTimeElement = document.getElementById('local-time');

    let allRepos = [];
    let allDocs = [];

    // Получаем репозитории и информацию о пользователе
    fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(user => {
            followersElement.textContent = user.followers;
            followingElement.textContent = user.following;
            locationElement.textContent = user.location || 'Не указано';

            // Обновляем время каждую минуту
            setInterval(() => {
                const now = new Date();
                const options = { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Yekaterinburg' };
                localTimeElement.textContent = now.toLocaleTimeString('ru-RU', options) + ' (UTC +05:00)';
            }, 1000);
        })
        .catch(error => {
            console.error('Ошибка при загрузке данных пользователя:', error);
        });

    // Получаем репозитории
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(repos => {
            allRepos = repos;
            renderRepos(repos);
            allDocs = repos.filter(repo => repo.topics && repo.topics.includes('docs'));
            renderDocs(allDocs);
        })
        .catch(error => {
            console.error('Ошибка при загрузке репозиториев:', error);
            reposList.innerHTML = '<li>Не удалось загрузить репозитории.</li>';
        });

    // Поиск репозиториев
    searchReposInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredRepos = allRepos.filter(repo => repo.name.toLowerCase().includes(searchTerm));
        renderRepos(filteredRepos);
    });

    // Поиск по базе знаний
    searchDocsInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredDocs = allDocs.filter(doc => doc.name.toLowerCase().includes(searchTerm));
        renderDocs(filteredDocs);
    });

    // Рендер всех репозиториев
    function renderRepos(repos) {
        reposList.innerHTML = '';
        repos.forEach(repo => {
            const listItem = document.createElement('li');
            listItem.classList.add('fade-in');
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
    function renderDocs(docs) {
        docsList.innerHTML = '';
        docs.forEach(doc => {
            const docItem = document.createElement('li');
            docItem.classList.add('fade-in');
            const docHeader = document.createElement('div');
            docHeader.classList.add('doc-header');
            const docTitle = document.createElement('h3');
            docTitle.textContent = doc.name;

            const docDetails = document.createElement('div');
            docDetails.classList.add('doc-details', 'open');
            const docDescription = document.createElement('p');
            docDescription.textContent = doc.description || 'Описание отсутствует';

            const docTags = document.createElement('div');
            docTags.classList.add('doc-tags');
            doc.topics.forEach(topic => {
                const tag = document.createElement('span');
                tag.textContent = `#${topic}`;
                docTags.appendChild(tag);
            });

            const docLink = document.createElement('a');
            docLink.href = `https://${username}.github.io/${doc.name}`;
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
        });
    }

    // Анимация аккордеона
    function toggleAccordion(item) {
        const details = item.querySelector('.repo-details');
        details.classList.toggle('open');
    }

    const toggleButton = document.getElementById('toggle-info');
    const mainInfo = document.querySelector('.main-info');

    toggleButton.addEventListener('click', () => {
        mainInfo.classList.toggle('collapsed');
        if (mainInfo.classList.contains('collapsed')) {
            toggleButton.textContent = 'Показать информацию';
        } else {
            toggleButton.textContent = 'Скрыть информацию';
        }
    });

    // Пример динамической загрузки сертификатов
    const certificates = [
        {
            title: "Администрирование TATLIN UNIFIED GEN2",
            image: "certs/certificate1.jpg",
            download: "certs/certificate1.jpg"
        },
        // Добавьте больше сертификатов по аналогии
    ];

    const certificatesAccordion = document.getElementById('certificatesAccordion');

    certificates.forEach((cert, index) => {
        const accordionItem = document.createElement('div');
        accordionItem.classList.add('accordion-item', 'bg-dark');

        const accordionHeader = document.createElement('h2');
        accordionHeader.classList.add('accordion-header');
        accordionHeader.id = `heading${index}`;

        const accordionButton = document.createElement('button');
        accordionButton.classList.add('accordion-button', 'bg-dark', 'text-white');
        accordionButton.type = 'button';
        accordionButton.setAttribute('data-bs-toggle', 'collapse');
        accordionButton.setAttribute('data-bs-target', `#collapse${index}`);
        accordionButton.setAttribute('aria-expanded', 'false');
        accordionButton.setAttribute('aria-controls', `collapse${index}`);
        accordionButton.textContent = cert.title;

        const accordionCollapse = document.createElement('div');
        accordionCollapse.id = `collapse${index}`;
        accordionCollapse.classList.add('accordion-collapse', 'collapse');
        accordionCollapse.setAttribute('aria-labelledby', `heading${index}`);
        accordionCollapse.setAttribute('data-bs-parent', '#certificatesAccordion');

        const accordionBody = document.createElement('div');
        accordionBody.classList.add('accordion-body');

        const certImage = document.createElement('img');
        certImage.src = cert.image;
        certImage.alt = cert.title;
        certImage.classList.add('img-fluid', 'mb-3');

        const downloadLink = document.createElement('a');
        downloadLink.href = cert.download;
        downloadLink.download = cert.download;
        downloadLink.classList.add('btn', 'btn-primary');
        downloadLink.textContent = 'Скачать';

        accordionBody.appendChild(certImage);
        accordionBody.appendChild(downloadLink);
        accordionCollapse.appendChild(accordionBody);
        accordionHeader.appendChild(accordionButton);
        accordionItem.appendChild(accordionHeader);
        accordionItem.appendChild(accordionCollapse);
        certificatesAccordion.appendChild(accordionItem);
    });
});