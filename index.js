#! /usr/bin/env node

import { program } from "commander";
import check from "./commands/check.js";

program
  .command("check")
  .description(
    "Checks if the versions of a dependency in given repositories are up to date with the specified version"
  )
  .argument("<path>", "Path to csv file containing link to github repositories")
  .argument(
    "<version>",
    "Dependency version to check if specified dependency is up to date in repositories in csv file"
  )
  .action(check);

program.parse();
