import axios from "axios"
import { API_SUGGEST_URL } from "~/config"

const suggest_song= async (song_name, artist_name)=> {
    const res= await axios({
        url: API_SUGGEST_URL+ "/suggest-search",
        method: "get",
        params: {
            song_name, artist_name
        }
    })
    const result= await res.data
    return result
}

export default suggest_song