import Timeline from '../js/Timeline';

const app = new Timeline();

// eslint-disable-next-line no-undef
test('should return false on verify', () => {
// eslint-disable-next-line no-undef
  expect(app.verifyCoords('vvvyfcjhvv')).toBe(false);
});

// eslint-disable-next-line no-undef
test('should return true on verify', () => {
// eslint-disable-next-line no-undef
  expect(app.verifyCoords('[11.111, 11.111]')).toBe(true);
});
