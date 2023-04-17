import { Query } from "@types";

export function getQueryString(query: Query | undefined): string {
  if (!query) return "";

  const queryStr = Object.entries(query)
    .map(([key, value]) => {
      if (key === "@include") {
        return (
          `${key}=` +
          (value as Array<{ path: string; select?: string }>)
            .map((v: { path: string; select?: string }) => {
              return `${v.path}${v.select ? `:${v.select.split(" ").join(",")}` : ""}`;
            })
            .join(";")
        );
      } else if (key === "@sort") {
        return (
          `${key}=` +
          Object.entries(value as Record<string, "asc" | "desc">)
            .map(([k, v]) => `${k}:${v}`)
            .join(";")
        );
      } else if (key === "@page" || key === "@size") {
        return `${key}=${value}`;
      } else if (typeof value === "object") {
        const innerKey = Object.keys(value as object)[0];
        let newKey = key + ":" + innerKey.substring(1);
        const innerValue = (value as any)[innerKey];
        if (Array.isArray(innerValue)) {
          return `${newKey}=${innerValue.join(",")}`;
        }
        return `${newKey}=${innerValue}`;
      }
      return `${key}=${value}`;
    })
    .join("&");
  return queryStr;
}
