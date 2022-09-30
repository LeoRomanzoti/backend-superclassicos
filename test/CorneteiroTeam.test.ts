import CorneteiroTeam from "../src/domain/entity/CorneteiroTeam";

test("should instanciate a CorneteiroTeam class", () => {
  const corneteiroTeam = new CorneteiroTeam("1", []);
  expect(corneteiroTeam).toBeDefined();
});
