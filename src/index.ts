#! /usr/bin/env node

import { Command } from "commander";
import { getUserEvents } from "./utils";

const program = new Command();

program
  .description("Simple CLI to fetch the recent activity of a GitHub user")
  .version("1.0.0")
  .argument("<username>", "username")
  .option("--perpage <number>", "custom total items per page (default: 20)")
  .option("--page <number>", "go to specify page (default: 1)")
  .action(async (username, options) => {
    let perpage = options.perpage ? options.perpage : 20;
    let page = options.page ? options.page : 1;
    await getUserEvents(username, perpage, page);
  });

program.parse(process.argv);
