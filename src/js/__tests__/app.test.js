import { parseCoordinates } from "../parseCoordinates";

test.each([
  {
    data: "51.50851, -0.12572",
    expected: { latitude: 51.50851, longitude: -0.12572 },
  },
  {
    data: "51.50851,-0.12572",
    expected: { latitude: 51.50851, longitude: -0.12572 },
  },
  {
    data: "[51.50851, -0.12572]",
    expected: { latitude: 51.50851, longitude: -0.12572 },
  },
])("correct working of function parseCoordinates", ({ data, expected }) => {
  expect(parseCoordinates(data)).toEqual(expected);
});