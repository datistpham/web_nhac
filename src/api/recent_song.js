import axios from "axios"
import { API_URL } from "~/config"

const recent_song= async (id_user, id_song)=> {
    const res= await axios({
        url: API_URL+ "/recent-song",
        method: "post",
        data: {
            id_user, id_song
        }
    })
    const result= await res.data
    return result
}

export default recent_song