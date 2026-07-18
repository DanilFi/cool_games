
const menuDiv = document.createElement('div');
menuDiv.id = 'menu';
menuDiv.innerHTML = `
    <style>
        #menu { padding: 20px; display: flex; flex-direction: column; align-items: center; }
        #gamesGrid { display: flex; gap: 15px; width: 100%; justify-content: center; flex-wrap: wrap; margin-top: 20px; }
        .game-card { width: 120px; text-align: center; cursor: pointer; background: #333; padding: 10px; border-radius: 8px; transition: transform 0.2s; }
        .game-card:hover { transform: scale(1.05); }
        .game-card img { width: 100px; height: 100px; border-radius: 8px; object-fit: cover; }
        .game-card p { margin: 8px 0 0 0; font-size: 14px; }
        #gameContainer { width: 100%; height: 100%; display: none; position: relative; }
        #gameFrame { width: 100%; height: 100%; border: none; }
        #backButton { position: absolute; top: 10px; left: 10px; padding: 10px 15px; background: #ff3b30; color: white; border: none; cursor: pointer; border-radius: 5px; z-index: 10; font-weight: bold; }
    </style>
    <div id="menuContent">
        <h2>Выберите игру:</h2>
        <div id="gamesGrid"></div>
    </div>
    <div id="gameContainer">
        <button id="backButton">⬅ В меню</button>
        <iframe id="gameFrame" src="" allow="autoplay; fullscreen"></iframe>
    </div>
`;
document.body.appendChild(menuDiv);

// Навешиваем событие на кнопку назад
document.getElementById('backButton').onclick = function() {
    document.getElementById('gameFrame').src = "";
    document.getElementById('gameContainer').style.display = 'none';
    document.getElementById('menuContent').style.display = 'block';
};

// Загружаем список игр
fetch(`https://${window.GITHUB_USERNAME}.github.io/${window.REPOSITORY_NAME}/games_list.json?v=${Date.now()}`)
    .then(res => res.json())
    .then(games => {
        const grid = document.getElementById('gamesGrid');
        games.forEach(game => {
            const card = document.createElement('div');
            card.className = 'game-card';
            card.innerHTML = `<img src="${game.icon}"><p>${game.title}</p>`;
            card.onclick = () => {
                document.getElementById('menuContent').style.display = 'none';
                document.getElementById('gameContainer').style.display = 'block';
                document.getElementById('gameFrame').src = `https://${window.GITHUB_USERNAME}.github.io/${window.REPOSITORY_NAME}/${game.id}/index.html`;
            };
            grid.appendChild(card);
        });
    });
