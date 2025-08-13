import { EVENT_TYPE } from "./type";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const secretKey = process.env.SECRET_KEY;

export async function getUserEvents(username: string, per_page: number = 5, page: number = 1) {
  const params = new URLSearchParams();
  params.append("per_page", per_page.toString());
  params.append("page", page.toString());

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${secretKey}`);

  const url = `https://api.github.com/users/${username}/events?${params}`;

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    result?.forEach((item: any) => {
      let message = "";

      switch (item?.type) {
        case EVENT_TYPE.PUSH_EVENT:
          message = `Pushed ${item?.payload?.size} commit${item?.payload?.size > 1 ? "s" : ""} to ${item?.repo?.name}`;
          break;

        case EVENT_TYPE.ISSUES_EVENT:
          message = `${item?.payload?.action === "closed" ? "Closed" : "Opened a new"} issue in ${item?.repo?.name}`;
          break;

        default:
          message = "...";
          break;
      }
      console.log(message);
    });
  } catch (error) {
    error instanceof Error ? console.error(error.message) : console.error(error);
  }
}
