window.addEventListener('load', function() {
  console.log('window loaded...');
});

window.addEventListener('load', function() {
  window.toaster.message({
    text: 'Hello',
    type: 'warning',
    onClick: () => {
      console.log('CLICKED');
    },
    removeFromDOMByClick: true,
    // time: 'normal',
  });
});
