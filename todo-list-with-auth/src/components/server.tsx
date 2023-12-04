import { getInfo } from "~/utils/api";

export default async function ServerComponent() {
  const tasks = await getInfo();
  console.log("ServerComponent");
  return <div>{JSON.stringify(tasks, undefined, 2)}</div>;
}
