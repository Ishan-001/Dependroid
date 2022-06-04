import getEntries from "../util/parser.js";
import getDependenciesFromJson from "../util/scraper.js";
import compareVersionsForResults from "../util/comparator.js";

export default async function check(path, version) {
  var records = await getEntries(path);

  var currentDependencies = [];

  for (const record of records) {
    var repoLink = record.repo;
    var repoName = repoLink.replace("https://github.com/", "");

    var dataUrl =
      "https://raw.githubusercontent.com/" + repoName + "/main/package.json";

    getDependenciesFromJson(dataUrl, version, function (repoDependencyVersion) {
      currentDependencies.push(repoDependencyVersion);
      compareVersionsForResults(currentDependencies, version, records);
    });

    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

//check("C:/Users/HP/Desktop/dyte-task/assets/test.csv", "axios@0.23.0");
