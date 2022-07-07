import { ButtonContained, ButtonOutline } from '@makinox/makinox-ui';

export default function Reset() {
  const reloadContainer = document.querySelector('.section-reload') as HTMLElement;
  const titleElement = document.createElement('h2');
  const wrapElement = document.createElement('div');
  const noElement = document.createElement('button');
  const yesElement = document.createElement('button');

  reloadContainer.style.display = 'flex';
  titleElement.innerText = 'Play again?';
  noElement.className = `${ButtonOutline()}`;
  noElement.innerText = 'No';
  yesElement.className = `${ButtonContained()}`;
  yesElement.innerText = 'Yes';
  yesElement.onclick = () => window.location.reload();
  wrapElement.className = 'flex justify-center';

  reloadContainer.appendChild(titleElement);
  wrapElement.appendChild(noElement);
  wrapElement.appendChild(yesElement);
  reloadContainer.appendChild(wrapElement);
}
