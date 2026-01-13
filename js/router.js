// router.js - 依 AppState.js 狀態管理頁面與用戶內容顯示

// 取得預設頁面
function getDefaultPage() {
    return 'dashboard';
}

// 根據用戶狀態顯示對應內容
function renderUserContent() {
    const isAdvanced = AppState.user.isServiceEnabled;

    document.querySelectorAll('.general-user').forEach(el => {
        el.style.display = isAdvanced ? 'none' : 'block';
    });
    document.querySelectorAll('.advanced-user').forEach(el => {
        el.style.display = isAdvanced ? 'block' : 'none';
    });
}

// 動態載入頁面 HTML
async function loadPage(page) {
    const container = document.getElementById('page-container');
    if (!container) return console.error("找不到 #page-container");

    try {
        const res = await fetch(`pages/${page}.html`);
        let htmlText = await res.text();

        // 移除 live-server 自動插入的 script
        htmlText = htmlText.replace(/<!-- Code injected by live-server -->[\s\S]*?<\/script>/gi, '');
        container.innerHTML = htmlText;

        // 依 AppState 顯示 header / sidebar / user content
        renderHeader();
        renderSidebar();
        initCardsAfterPageLoad();
        renderUserContent();

        afterPageLoad(page)

        if (document.getElementById('usageBar')) {
            ProgressManager.init();
            AppState.initProgress();
        }

    } catch (err) {
        console.error("載入頁面失敗:", err);
        container.innerHTML = `<p>頁面載入失敗，請稍後再試。</p>`;
    }
}

// 切換頁面
async function goToPage(page, scroll = 0) {
    AppState.currentPage = page;

    await loadPage(page);

    // 滾動到指定位置
    const container = document.getElementById('page-container');
    if (!container) return;

    let y = 0;
    if (scroll) {
        if (!isNaN(scroll)) {
            y = parseInt(scroll);
        } else {
            switch (scroll) {
                case 'top': y = 0; break;
                case 'middle': y = container.scrollHeight / 2 - window.innerHeight / 2; break;
                case 'bottom': y = container.scrollHeight - window.innerHeight; break;
                default:
                    const el = document.getElementById(scroll);
                    if (el) y = el.offsetTop;
            }
        }
    }
    window.scrollTo({ top: y, behavior: 'smooth' });
}

function afterPageLoad(page) {
    if(page === 'dashboard') {
        if(typeof renderOverview === 'function') {
            renderOverview('dashboard-overview')
        }
    }
    if(page === 'reward_center') {
        if(typeof renderOverview === 'function') {
            renderOverview('reward-overview')
        }
    }
    initOperationArea()
    renderHeader()
}

// 初始化 sidebar 點擊事件
function bindSidebarEvents() {
    document.querySelectorAll('#sidebarMenu a.nav-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const page = link.dataset.page;
            if (page) goToPage(page);
        });
    });
}

// 初始化整個網站
document.addEventListener('DOMContentLoaded', async () => {
    const defaultPage = getDefaultPage();
    AppState.currentPage = defaultPage;

    renderSidebar();
    bindSidebarEvents();

    // 頁面載入
    await loadPage(defaultPage);

    // 監聽全站點擊可切換頁面
    document.addEventListener('click', e => {
        const target = e.target.closest('[data-page]');
        if (!target) return;
        if (target.closest('#sidebarMenu')) return;

        e.preventDefault();

        const page = target.dataset.page;
        const scroll = target.dataset.scroll;
        if (!page) return;

        goToPage(page, scroll);
    });
});

// 可在 AppState.user.isServiceEnabled 改變時呼叫此函式更新頁面
function refreshPageByUserStatus() {
    renderSidebar();
    renderUserContent();
}
