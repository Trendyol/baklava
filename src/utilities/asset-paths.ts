let iconPath = './assets';

export function setIconPath(path: string) {
  iconPath = path;
}

export function getIconPath() {
  return iconPath;
}

const modulePath = import.meta.url;

if (modulePath) {
  setIconPath(modulePath.split('/').slice(0, -1).concat('assets').join('/'));
}
