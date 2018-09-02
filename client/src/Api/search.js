import axios from 'axios';

const SERVER = 'http://localhost:9090/index.php';

export default {
    search : {
        get: credentials =>
            axios.get(SERVER+'?search=' + credentials.search).then(res=>res.data).catch(error => { throw new Error(error); console.dir(error)} ),
    }
}

