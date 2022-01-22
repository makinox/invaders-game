import Icon from '/assets/enemy.png';

export default function Helmet() {
  const faviconElement = document.createElement('link');
  faviconElement.rel = 'icon';
  faviconElement.href = Icon;

  const imageFace = document.createElement('meta');
  imageFace.name = 'og:image';
  imageFace.content = Icon;

  const imageTw = document.createElement('meta');
  imageTw.name = 'twitter:image';
  imageTw.content = Icon;

  document.head.appendChild(faviconElement);
  document.head.appendChild(imageFace);
  document.head.appendChild(imageTw);
}
