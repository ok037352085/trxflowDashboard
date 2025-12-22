function getDefaultPage() {
    return AppState.user.isServiceEnabled ? 'activeDashboard' : 'dashboard'
}

// 動態載入頁面
async function loadPage(page) {
    const container = document.getElementById('page-container')
    if (!container) return console.log("找不到 #page-container")

    try {
        const res = await fetch(`pages/${page}.html`)
        let htmlText = await res.text()

        htmlText = htmlText.replace(/<!-- Code injected by live-server -->[\s\S]*?<\/script>/gi, '')
        container.innerHTML = htmlText

        renderHeader()
        initCardsAfterPageLoad()

        if(document.getElementById('usageBar')) {
            ProgressManager.init()
            AppState.initProgress()
        }

    } catch (err) {
        console.error("載入頁面失敗:", err)
        container.innerHTML = `<p>頁面載入失敗，請稍後再試。</p>`
    }
}

// 切換頁面
async function goToPage(page, scroll) {
    AppState.currentPage = page

    renderSidebar()

    await loadPage(page)

    // 更新 sidebar 選中狀態
    // const links = document.querySelectorAll('#sidebarMenu a.nav-link')
    // links.forEach(a => a.classList.remove('active'))
    // const activeLink = document.querySelector(`#sidebarMenu a.nav-link[data-page="${page}"]`)
    // if (activeLink) activeLink.classList.add('active')

    const container = document.getElementById('page-container')
    if(!container) return

    if(scroll) {
        if(!isNaN(scroll)) {
            window.scrollTo({top: parseInt(scroll), behavior: 'smooth'})
        }else {
            let y = 0
            switch(scroll) {
                case 'top': y = 0; break
                case 'middle': y = container.scrollHeight / 2 - window.innerHeight / 2; break
                case 'bottom': y = container.scrollHeight - window.innerHeight; break
                default:
                    const el = document.getElementById(scroll)
                    if(el) y = el.offsetTop 
            }
            window.scrollTo({top: y, behavior: 'smooth'})
        }
    }else {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }
}

// 初始化頁面
document.addEventListener('DOMContentLoaded', () => {
    const defaultPage = getDefaultPage()
    AppState.currentPage = defaultPage
    renderSidebar()
    bindSidebarEvents()
    loadPage(defaultPage)

    document.addEventListener('click', e => {
        const target = e.target.closest('[data-page]')
        if(!target) return
        if(target.closest('#sidebarMenu')) return

        e.preventDefault()

        const page = target.dataset.page
        const scroll = target.dataset.scroll
        if(!page) return

        goToPage(page, scroll);
    })
});
