window.SidebarConfig = {
    beforeEnabled: [
        {
            key: 'dashboard',
            label: '儀表板',
            page: 'dashboard',
            icon: 'fas fa-chart-line',
        },
        {
            key: 'trx_tools',
            label: 'TRX工具與服務',
            page: 'trx_tools',
            icon: 'fa-solid fa-screwdriver-wrench',
        },
        {
            key: 'enable_flow',
            label: '啟用流程/任務',
            page: 'dashboard',
            icon: 'fa-solid fa-star',
            scroll: true
        },
        {
            key: 'account',
            label: '帳號與安全',
            page: 'account_security',
            icon: 'fa-solid fa-gear',
        },
        {
            key: 'tasking',
            label: 'TRX 質押中心',
            page: null,
            icon: 'fa-solid fa-cart',
            locked: true
        }   
    ],
    
    afterEnabled: [
        {
            key: 'activeDashboard',
            label: '儀表板',
            page: 'activeDashboard',
            icon: 'fas fa-chart-line',
        },
        {
            key: 'reward',
            label: 'TRX資源回饋中心',
            page: 'reward_center',
            icon: 'fa-solid fa-screwdriver-wrench',
        },
        {
            key: 'growth',
            label: '成長中心',
            page: 'growth_center',
            icon: 'fa-solid fa-star',
        },
        {
            key: 'tex_tools',
            label: "TRX工具與服務",
            page: 'trx_tools',
            icon: 'fa-solid fa-gear',
        },
        {
            key: 'account',
            label: '帳號與安全',
            page: 'account_security',
            icon: 'fa-solid fa-gear',
        }
    ]
};

function getSidebarMode() {
    return AppState.user.isServiceEnabled
    ? 'afterEnabled'
    : 'beforeEnabled';
}
