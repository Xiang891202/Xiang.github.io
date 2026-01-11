import { projects } from './databaseName.js';

// 生成卡片
const portfolio = document.getElementById('portfolio');

for (const key in projects) {
  const p = projects[key];
  const card = document.createElement('div');
  card.classList.add('project-card');
  card.dataset.project = key;

  card.innerHTML = `
    <div class="card-left">
      <img src="${p.img}" alt="${p.title}">
    </div>
    <div class="card-right">
      <h2>${p.title}</h2>
      <p class="summary">${p.summary}</p>
      <button class="open-modal">查看詳情</button>
    </div>
  `;

  portfolio.appendChild(card);
}

// 點擊卡片彈窗
document.querySelectorAll('.project-card .open-modal').forEach(btn => {
  btn.addEventListener('click', e => {
    const key = e.target.closest('.project-card').dataset.project;
    const project = projects[key];

    document.getElementById('modal-1-title').innerHTML = project.title;
    document.getElementById('modal-1-content').innerHTML = `
      <p>${project.detail}</p>
      <p><strong>PPT: </strong><a href="${project.ppt}" target="_blank">下載 PPT</a></p>
      <p><strong>影片: </strong><a href="${project.video}" target="_blank">觀看影片</a></p>
      <p><strong>網站: </strong><a href="${project.website}" target="_blank">${project.website ? "訪問網站" : ""}</a></p>
    `;
    document.getElementById('modal-1-link').href = project.demo;

    MicroModal.show('modal-1');
  });
});
