export const isMobileDevice = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

export const isTabletDevice = () => /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(navigator.userAgent);

export enum DeviceType {
  Smartphone = 'Smartphone',
  Tablet = 'Tablet',
  Desktop = 'Desktop',
}

const getDeviceType = (): DeviceType => {
  if (isMobileDevice()) return DeviceType.Smartphone;
  if (isTabletDevice()) return DeviceType.Tablet;
  return DeviceType.Desktop;
};

export default getDeviceType;
