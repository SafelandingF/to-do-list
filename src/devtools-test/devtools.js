chrome.devtools.panels.create('Devtron', 'devtron.png', 'index.html');
chrome.devtools.panels.elements.createSidebarPane(
  'new slider',
  function (sidebar) {
    // siderbar.setObject("key","value") 添加一个对象
    sidebar.setPage('slider.html'); //或者添加一个UI
  }
);
