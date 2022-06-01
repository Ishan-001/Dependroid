import compareVersions from "compare-versions";

export default function compareVersionsForResults(
  currentVersions,
  givenVersion,
  records
) {
  if (currentVersions.length === records.length) {
    var k = 0;
    currentVersions.forEach((repoVersion) => {
      records[k].version = repoVersion;

      var result = compareVersions(
        repoVersion,
        givenVersion.slice(givenVersion.indexOf("@") + 1, givenVersion.length)
      );

      if (result === 1) records[k++].version_satisfied = true;
      else if (result === 0) records[k++].version_satisfied = true;
      else records[k++].version_satisfied = false;
    });

    console.log("Check succesful");
    console.table(records);
  }
}
