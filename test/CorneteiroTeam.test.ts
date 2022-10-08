import CorneteiroTeam from "../src/domain/entity/CorneteiroTeam";

test("should instanciate a CorneteiroTeam class", () => {
  const corneteiroTeam = new CorneteiroTeam("Tabajara", "1", []);
  expect(corneteiroTeam).toBeDefined();
});
