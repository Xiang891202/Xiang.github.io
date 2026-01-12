// database.js - 動態生成內容（適應新的資料結構）
import { projectDatabase } from './databaseName.js';

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 已載入，開始載入專案資料...');
    
    // 檢查是否有資料
    if (!projectDatabase || !Array.isArray(projectDatabase)) {
        console.error('專案資料庫未正確載入');
        return;
    }
    
    console.log('專案資料庫載入成功，共有', projectDatabase.length, '個專案');

    // 取得容器元素
    const projectContainer = document.getElementById('product');
    
    // 清空容器（避免重複）
    projectContainer.innerHTML = '';
    
    // 建立圖卡容器
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'project-cards-container';
    
    // 產生每個專案的圖卡
    projectDatabase.forEach(project => {
        const projectCard = createProjectCard(project);
        cardsContainer.appendChild(projectCard);
    });
    
    projectContainer.appendChild(cardsContainer);
    
    // 建立詳細內容彈出視窗（初始隱藏）
    createDetailModal();
    
    console.log('專案圖卡和彈出視窗建立完成');
    
    // 加入 Font Awesome 圖示（用於按鈕）
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fontAwesome = document.createElement('link');
        fontAwesome.rel = 'stylesheet';
        fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(fontAwesome);
        console.log('Font Awesome 已載入');
    }
});

// 建立專案圖卡函數 - 使用 listPage 資料
function createProjectCard(project) {
    console.log('建立專案圖卡:', project.listPage.title);
    
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.projectId = project.id;

    // 左邊圖片區域
    const imageSection = document.createElement('div');
    imageSection.className = 'card-image';
    
    const label = document.createElement('div');
    label.className = 'image-label';
    label.textContent = '前端專案';
    
    const img = document.createElement('img');
    // 使用 Unsplash 圖片作為替代，因為本地圖片可能不存在
    img.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
    img.alt = project.listPage.alt;
    img.loading = 'lazy';
    
    imageSection.appendChild(label);
    imageSection.appendChild(img);

    // 右邊內容區域
    const contentSection = document.createElement('div');
    contentSection.className = 'card-content';
    
    const title = document.createElement('h2');
    title.className = 'card-title';
    title.textContent = project.listPage.title;
    
    const description = document.createElement('p');
    description.className = 'card-description';
    description.textContent = project.listPage.description;
    
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'tech-tags';
    
    project.listPage.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tech-tag';
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
    });
    
    // 由於新結構沒有 features，我們從 PM 思維中提取要點
    const featuresContainer = document.createElement('div');
    featuresContainer.className = 'features';
    
    // 顯示 PM 思維中的前幾個要點
    if (project.detailPage.pmThinking && project.detailPage.pmThinking.decision) {
        const points = project.detailPage.pmThinking.decision.points;
        points.slice(0, 3).forEach(point => {
            const featureItem = document.createElement('div');
            featureItem.className = 'feature-item';
            featureItem.textContent = point;
            featuresContainer.appendChild(featureItem);
        });
    }
    
    const link = document.createElement('button');
    link.type = 'button';
    link.className = 'project-link';
    link.textContent = '查看專案詳情';
    link.innerHTML += ' <i class="fas fa-arrow-right"></i>';
    
    // 點擊事件：顯示詳細內容彈出視窗
    link.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('點擊查看專案詳情，專案ID:', project.id);
        showProjectDetail(project.id);
    });

    // 組裝內容區域
    contentSection.appendChild(title);
    contentSection.appendChild(description);
    contentSection.appendChild(tagsContainer);
    contentSection.appendChild(featuresContainer);
    contentSection.appendChild(link);

    // 組裝整個圖卡
    card.appendChild(imageSection);
    card.appendChild(contentSection);

    return card;
}

// 建立詳細內容彈出視窗
function createDetailModal() {
    console.log('建立詳細內容彈出視窗');
    
    // 檢查是否已存在彈出視窗
    if (document.getElementById('detailOverlay')) {
        console.log('彈出視窗已存在');
        return;
    }
    
    // 建立彈出視窗容器
    const overlay = document.createElement('div');
    overlay.className = 'detail-overlay';
    overlay.id = 'detailOverlay';
    
    // 建立彈出視窗內容區域
    const modal = document.createElement('div');
    modal.className = 'detail-modal';
    
    // 建立關閉按鈕
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', '關閉視窗');
    
    // 建立彈出視窗內容容器
    const modalContent = document.createElement('div');
    modalContent.id = 'modalContent';
    
    // 組裝彈出視窗
    modal.appendChild(closeBtn);
    modal.appendChild(modalContent);
    overlay.appendChild(modal);
    
    // 加入頁面
    document.body.appendChild(overlay);
    
    // 點擊關閉按鈕事件
    closeBtn.addEventListener('click', hideDetailModal);
    
    // 點擊背景關閉視窗
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            hideDetailModal();
        }
    });
    
    // ESC 鍵關閉視窗
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            hideDetailModal();
        }
    });
    
    console.log('彈出視窗建立完成');
}

// 顯示詳細內容彈出視窗 - 使用 detailPage 資料
function showProjectDetail(projectId) {
    console.log('顯示專案詳細內容，ID:', projectId);
    
    const project = projectDatabase.find(p => p.id === projectId);
    if (!project) {
        console.error('找不到專案，ID:', projectId);
        return;
    }
    
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = '';
    
    // 建立詳細內容
    const detailContent = createDetailContent(project);
    modalContent.appendChild(detailContent);
    
    // 顯示彈出視窗
    const overlay = document.getElementById('detailOverlay');
    overlay.classList.add('active');
    
    // 防止背景滾動
    document.body.style.overflow = 'hidden';
    
    console.log('專案詳細內容已顯示');
}

// 隱藏詳細內容彈出視窗
function hideDetailModal() {
    console.log('隱藏詳細內容彈出視窗');
    
    const overlay = document.getElementById('detailOverlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
    
    // 恢復背景滾動
    document.body.style.overflow = 'auto';
}

// 建立詳細內容 - 使用新的 detailPage 資料結構
function createDetailContent(project) {
    console.log('建立詳細內容，專案:', project.listPage.title);
    
    const fragment = document.createDocumentFragment();
    
    // 建立標頭
    const header = document.createElement('div');
    header.className = 'detail-header';
    
    const title = document.createElement('h2');
    title.textContent = project.listPage.title;
    
    const subtitle = document.createElement('p');
    subtitle.className = 'detail-subtitle';
    subtitle.textContent = project.listPage.description;
    
    header.appendChild(title);
    header.appendChild(subtitle);
    fragment.appendChild(header);
    
    // 建立主要內容區域
    const content = document.createElement('div');
    content.className = 'detail-content';
    
    // 區域一：30秒短片 / Demo
    if (project.detailPage.videoSection) {
        const videoSection = document.createElement('div');
        videoSection.className = 'detail-section';
        
        const videoTitle = document.createElement('h3');
        videoTitle.textContent = project.detailPage.videoSection.title;
        videoSection.appendChild(videoTitle);
        
        // 視頻描述
        const videoDesc = document.createElement('p');
        videoDesc.textContent = project.detailPage.videoSection.description;
        videoDesc.style.marginBottom = '1.5rem';
        videoDesc.style.color = '#4b5563';
        videoSection.appendChild(videoDesc);
        
        // 視頻佔位圖（實際項目中這裡會是 video 元素）
        const videoPlaceholder = document.createElement('div');
        videoPlaceholder.style.cssText = `
            width: 100%;
            height: 400px;
            background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--secondary-color);
            font-size: 1.2rem;
            margin-bottom: 1.5rem;
        `;
        videoPlaceholder.innerHTML = `
            <div style="text-align: center;">
                <i class="fas fa-play-circle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <div>${project.detailPage.videoSection.title}</div>
                <div style="font-size: 0.9rem; margin-top: 0.5rem; color: #6b7280;">
                    （實際項目中這裡會是 30 秒操作示範影片）
                </div>
            </div>
        `;
        videoSection.appendChild(videoPlaceholder);
        
        content.appendChild(videoSection);
    }
    
    // 區域二：PM 思維
    if (project.detailPage.pmThinking) {
        const pmSection = document.createElement('div');
        pmSection.className = 'detail-section';
        
        const pmTitle = document.createElement('h3');
        pmTitle.textContent = '產品經理思維';
        pmSection.appendChild(pmTitle);
        
        // 問題定義
        if (project.detailPage.pmThinking.problem) {
            const problemCard = document.createElement('div');
            problemCard.className = 'feature-card';
            problemCard.style.marginBottom = '1.5rem';
            
            const problemTitle = document.createElement('h4');
            problemTitle.textContent = project.detailPage.pmThinking.problem.title;
            problemTitle.style.color = '#dc2626'; // 紅色標題
            
            const problemContent = document.createElement('p');
            problemContent.textContent = project.detailPage.pmThinking.problem.content;
            problemContent.style.marginTop = '0.8rem';
            problemContent.style.color = '#4b5563';
            problemContent.style.lineHeight = '1.7';
            
            problemCard.appendChild(problemTitle);
            problemCard.appendChild(problemContent);
            pmSection.appendChild(problemCard);
        }
        
        // 解決方式
        if (project.detailPage.pmThinking.solution) {
            const solutionCard = document.createElement('div');
            solutionCard.className = 'feature-card';
            solutionCard.style.marginBottom = '1.5rem';
            
            const solutionTitle = document.createElement('h4');
            solutionTitle.textContent = project.detailPage.pmThinking.solution.title;
            solutionTitle.style.color = '#16a34a'; // 綠色標題
            
            const solutionContent = document.createElement('p');
            solutionContent.textContent = project.detailPage.pmThinking.solution.content;
            solutionContent.style.marginTop = '0.8rem';
            solutionContent.style.color = '#4b5563';
            solutionContent.style.lineHeight = '1.7';
            
            solutionCard.appendChild(solutionTitle);
            solutionCard.appendChild(solutionContent);
            pmSection.appendChild(solutionCard);
        }
        
        // 設計取捨 / 技術決策
        if (project.detailPage.pmThinking.decision) {
            const decisionCard = document.createElement('div');
            decisionCard.className = 'feature-card';
            
            const decisionTitle = document.createElement('h4');
            decisionTitle.textContent = project.detailPage.pmThinking.decision.title;
            decisionTitle.style.color = '#2563eb'; // 藍色標題
            
            const decisionList = document.createElement('ul');
            decisionList.style.marginTop = '0.8rem';
            decisionList.style.paddingLeft = '1.2rem';
            
            project.detailPage.pmThinking.decision.points.forEach(point => {
                const pointItem = document.createElement('li');
                pointItem.textContent = point;
                pointItem.style.marginBottom = '0.5rem';
                pointItem.style.color = '#4b5563';
                pointItem.style.lineHeight = '1.6';
                decisionList.appendChild(pointItem);
            });
            
            decisionCard.appendChild(decisionTitle);
            decisionCard.appendChild(decisionList);
            pmSection.appendChild(decisionCard);
        }
        
        content.appendChild(pmSection);
    }
    
    // 技術棧標籤
    const techStackSection = document.createElement('div');
    techStackSection.className = 'detail-section tech-stack';
    
    const stackTitle = document.createElement('h3');
    stackTitle.textContent = '技術棧';
    techStackSection.appendChild(stackTitle);
    
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'tech-tags';
    
    project.listPage.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tech-tag';
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
    });
    
    techStackSection.appendChild(tagsContainer);
    content.appendChild(techStackSection);
    
    // 區域三：實際體驗 / 連結
    if (project.detailPage.experienceSection) {
        const experienceSection = document.createElement('div');
        experienceSection.className = 'detail-section';
        
        const experienceTitle = document.createElement('h3');
        experienceTitle.textContent = project.detailPage.experienceSection.title;
        experienceSection.appendChild(experienceTitle);
        
        // 描述
        const experienceDesc = document.createElement('p');
        experienceDesc.textContent = project.detailPage.experienceSection.description;
        experienceDesc.style.marginBottom = '1.5rem';
        experienceDesc.style.color = '#4b5563';
        experienceSection.appendChild(experienceDesc);
        
        content.appendChild(experienceSection);
    }
    
    // 按鈕區域 - 移除「查看程式碼實作」按鈕
    const actionsSection = document.createElement('div');
    actionsSection.className = 'detail-actions';
    
    // Demo 按鈕
    if (project.detailPage.experienceSection && project.detailPage.experienceSection.demoLink) {
        const demoBtn = document.createElement('a');
        demoBtn.href = project.detailPage.experienceSection.demoLink;
        demoBtn.className = 'detail-btn btn-primary';
        demoBtn.target = '_blank';
        demoBtn.rel = 'noopener noreferrer';
        demoBtn.textContent = project.detailPage.experienceSection.buttonText || '前往操作篩選器';
        demoBtn.innerHTML += ' <i class="fas fa-external-link-alt"></i>';
        actionsSection.appendChild(demoBtn);
    }
    
    // 只保留關閉視窗按鈕
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'detail-btn';
    closeBtn.style.background = '#f1f5f9';
    closeBtn.style.color = '#4b5563';
    closeBtn.style.marginLeft = 'auto';
    closeBtn.textContent = '關閉視窗';
    closeBtn.addEventListener('click', hideDetailModal);
    actionsSection.appendChild(closeBtn);
    
    content.appendChild(actionsSection);
    fragment.appendChild(content);
    
    return fragment;
}
