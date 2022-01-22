import Icon from '/assets/enemy.png';

export default function Helmet() {
  const faviconElement = document.createElement('link');
  faviconElement.rel = 'icon';
  faviconElement.href = Icon;

  const imageFace = document.createElement('meta');
  imageFace.name = 'og:image';
  imageFace.content = window.location.href.substring(0, window.location.href.length - 1) + Icon;

  const imageTw = document.createElement('meta');
  imageTw.name = 'twitter:image';
  imageTw.content = window.location.href.substring(0, window.location.href.length - 1) + Icon;

  document.head.appendChild(faviconElement);
  document.head.appendChild(imageFace);
  document.head.appendChild(imageTw);
}
