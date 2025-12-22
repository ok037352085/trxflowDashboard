function getSidebarMode() {
  return AppState.user.isServiceEnabled
  ? 'afterEnabled'
  : 'beforeEnabled'
}

window.renderSidebar = function () {
  const menu = document.getElementById('sidebarMenu')
  menu.innerHTML = ''

  SidebarConfig[getSidebarMode()].forEach(item => {
    const li = document.createElement('li')
    li.className = 'nav-item'


    li.innerHTML = `
      <a class="nav-link ${item.locked ? 'is-locked' : ''}
        ${item.page === AppState.currentPage ? 'active' : ''}"
        href="${item.scroll ? '#pagebottom' : '#'}"
        data-page="${item.page}"
        data-locked="${item.locked ? 'true':'false'}">
        <i class="${item.icon}"></i>
        <p>${item.label}</p>
      </a>
    `
    menu.appendChild(li)
  })
}

function bindSidebarEvents() {
  document.getElementById('sidebarMenu')
    .addEventListener('click', e => {
      const link = e.target.closest('[data-page]')
      if (!link) return;
      if(link.dataset.locked === 'true') return

      e.preventDefault()

      AppState.currentPage = link.dataset.page

      renderSidebar()

      loadPage(link.dataset.page, link.dataset.scroll)
    })
}
