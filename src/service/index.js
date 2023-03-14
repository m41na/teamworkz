import axios from 'axios';

export async function fetchAppTitle(){

    return await axios.get('http://localhost:5000/api/meta/title').then(res => res.data)
}
