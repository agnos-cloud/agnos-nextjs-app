import { useQuery } from "react-query";
import axios from "axios";

export function useGetTeams() {
  const {
    isLoading,
    error,
    data: teams,
  } = useQuery("repoData", () =>
    axios(`${process.env.API_URL}/teams`).then(
      (response) => response.data["teams"]
    )
  );

  return { isLoading, error, teams };
}

// export function useGetTeams() {
//     const { isLoading, error, data } = useQuery('repoData', () =>
//      axios({
//         method: "GET",
//         url: `${process.env.API_URL}/teams`,
//         })
//         .then((response) => response.data)
//    )
// }
