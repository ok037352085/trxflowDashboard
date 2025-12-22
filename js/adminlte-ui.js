function initSidebarToggle() {
  const toggleLink = document.getElementById('sidebarToggleIcon');
  const body = document.body;

  if (body.classList.contains('sidebar-collapse')) {
    toggleLink.classList.add('rotated');
  }

  $(document).on(
    'collapsed.lte.pushmenu shown.lte.pushmenu',
    () => {
      toggleLink.classList.toggle(
        'rotated',
        body.classList.contains('sidebar-collapse')
      );
    }
  );
}
