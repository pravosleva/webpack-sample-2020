window.onload = (function() {
  console.log('window loaded...');

  window.toaster.message({
    text: 'Hello',
    type: 'warning',
    onClick: () => {
      console.log('CLICKED');
    },
    removeFromDOMByClick: true,
    // time: 'normal',
  });
})()
