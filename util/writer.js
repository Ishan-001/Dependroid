import fs from "fs";

export default function updateDependency(repo_name, data, dependency, version) {
  data.dependencies[dependency] = "^" + version;
  fs.writeFile(process.env.GIT_CLONE_PATH + "/" + repo_name, data, (error) => {
    if (error) console.log(error);
  });
}
