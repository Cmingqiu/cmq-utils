/**
 * 修复scrollTo方法
 **/
function fixScrollTo() {
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  window.scrollTo = (iframe.contentWindow as Window).scrollTo;
  iframe.remove();
}

export default fixScrollTo;
