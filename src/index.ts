#! /usr/bin/env node

import { Command } from "commander";
import { getUserEvents } from "./utils";

const program = new Command();

program
  .version("1.0.0")
  .description("Simple CLI to fetch the recent activity of a GitHub user")
  .argument("<username>", "username")
  .action(async (username) => await getUserEvents(username));

program.parse(process.argv);
