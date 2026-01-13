// sidebar.js - 單一陣列版
window.SidebarConfig = [
    { key: 'dashboard', label: '儀表板', page: 'dashboard', icon: 'fas fa-chart-line' },
    { key: 'reward', label: 'TRX資源回饋中心', page: 'reward_center', icon: 'fa-solid fa-screwdriver-wrench' },
    { key: 'growth', label: '成長中心', page: 'growth_center', icon: 'fa-solid fa-star' },
    { key: 'tex_tools', label: 'TRX工具與服務', page: 'trx_tools', icon: 'fa-solid fa-gear' },
    { key: 'account', label: '帳號與安全', page: 'account_security', icon: 'fa-solid fa-gear' },
];

window.renderSidebar = function () {
    const menu = document.getElementById('sidebarMenu');
    menu.innerHTML = '';

    // 直接用單一 SidebarConfig 陣列
    SidebarConfig.forEach(item => {
        const li = document.createElement('li');
        li.className = 'nav-item';

        li.innerHTML = `
          <a class="nav-link ${item.page === AppState.currentPage ? 'active' : ''}"
             href="${item.scroll ? '#pagebottom' : '#'}"
             data-page="${item.page}">
             <i class="${item.icon}"></i>
             <p>${item.label}</p>
          </a>
        `;
        menu.appendChild(li);
    });
}

function bindSidebarEvents() {
    document.getElementById('sidebarMenu')
        .addEventListener('click', e => {
            const link = e.target.closest('[data-page]');
            if (!link) return;

            e.preventDefault();
            AppState.currentPage = link.dataset.page;

            renderSidebar();
            loadPage(link.dataset.page, link.dataset.scroll);
        });
}
