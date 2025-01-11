const options = ['belem-default', 'belem-default-docas'];

export function randomPicture(): string {
  const randomIndex = Math.floor(Math.random() * options.length);
  const picture = options[randomIndex];
  return `/images/${picture}.jpg`;
}
