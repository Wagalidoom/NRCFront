const Axios = require('axios');

async function fetchData() {
    const query = `
    {
        nfts(where: { listed: true }) {
            id
            owner
            listed
        }
    }
    `;
    
    try {
        const result = await Axios.post("https://api.studio.thegraph.com/query/48701/nrctestnet/v0.0.6", { query: query });
        const hasColorChosen = Object.values(result.data.data);
        // console.log(result);
        console.log(hasColorChosen);
    } catch (error) {
        console.log(error);
    }
}

fetchData();

