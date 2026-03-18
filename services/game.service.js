import { getBaseServerUrl} from "../config/config";

export async function getGamesFromServer() {
    const token = `Bearer ${localStorage.getItem("token")}`;
    const baseUrl = getBaseServerUrl();
    const response = await fetch(`${baseUrl}/games`, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    });
    if(response.status !== 200) {
        throw new Error("Failed to get games from server");
    }
    return response.json();
}