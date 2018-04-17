const expect = require("chai").expect;
const chaiJestSnapshot = require("../../dist/");

describe("using chaiJestSnapshot in framework-agnostic configuration mode", function() {
  beforeEach(function() {
    const snapshotFilename = __filename + ".snap";

    // This filename will be used for all calls of matchSnapshot.
    // You can call setFilename again in another file to change it.
    chaiJestSnapshot.setFilename(snapshotFilename);
    chaiJestSnapshot.createState(snapshotFilename);

    // A snapshot name will be autogenerated from this test name. It
    // will have a number at the end of it based on how many times you
    // called matchSnapshot within that function (similar to jest).
    chaiJestSnapshot.setTestName(this.currentTest.fullTitle());
    // `this.fullTitle()` is mocha-specific, and returns the title of the current test.
  });

  it("does not require any arguments", function() {
    expect({ foo: "bar" }).to.matchSnapshot();
  });

  it("appends a number to the end of each snapshot name so that if you call matchSnapshot more than once, there isn't a conflict", function() {
    expect({ first: "thing" }).to.matchSnapshot();
    expect({ second: "thing" }).to.matchSnapshot();
  });

  it("uses an optional first argument to update a snapshot", function() {
    expect({ foo: "not bar" }).to.matchSnapshot(true);
  });

  it("can use an environment variable to update the snapshot instead", function() {
    process.env.CHAI_JEST_SNAPSHOT_UPDATE_ALL = "true";
    expect({ foo: "something else" }).to.matchSnapshot();
    delete process.env.CHAI_JEST_SNAPSHOT_UPDATE_ALL;
  });
});
