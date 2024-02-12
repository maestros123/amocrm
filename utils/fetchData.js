import axios from "axios";

const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQ1MmM3OTk0MTVlNzhiMDc3MzgwYjIxOGUyMzA0ZTEwMDEwODk4ZjA5OTc0MzM4MDRlNGY2OTVkZTM3MGJjODJjNDdjMjE1NGQ0MGVhNmYzIn0.eyJhdWQiOiIwNTg5YzY0Zi03OTY2LTRkYjgtODJiMy1kOGU1YzBmYTg4OGUiLCJqdGkiOiJkNTJjNzk5NDE1ZTc4YjA3NzM4MGIyMThlMjMwNGUxMDAxMDg5OGYwOTk3NDMzODA0ZTRmNjk1ZGUzNzBiYzgyYzQ3YzIxNTRkNDBlYTZmMyIsImlhdCI6MTcwNzY1OTUyNCwibmJmIjoxNzA3NjU5NTI0LCJleHAiOjE3MDc3NDU5MjQsInN1YiI6IjEwNjQ1NTE4IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxNTU0MTU0LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJwdXNoX25vdGlmaWNhdGlvbnMiLCJmaWxlcyIsImNybSIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiMGNlOTMyZjAtNDk5NS00ZmUzLWJiMGEtZjFhMWRhZmJiNTllIn0.BJr4e8NOkY-O16gQpFzaaSOj_qrqUg6pMXXnL9p8cnCMMJNcv34SZ8_ZA7eDoOaNmbOvexcvMhku0tTezQGdFaEGYTd_LhLTibS6WyX3c9ouq2BbVKVJb6CkgSQ3FEyg7l45Ht1Ytemt67B3Np07jbbrcMhn-qQzPgOFHhZR2SB_Ai3YgYpLOu_O3UqFt3mzPfixSn90wquYsmazccfIom9XcN_jg096OCFlVEj3CeqUIU-mJX6ya8xzWfQt1saajGHv3jR2lfoMMZ6dajJpf16xL8872s280HTqDpwCvrnx9fqZCvKeWxt9f8IgJ5c3wPVLbW8Bwi_cgocKCH0WGQ'
const refreshToken = 'def5020081d36ccf3b93169eb813ef7ca8b827080d87dd3140c98907f2dc75bb5cfee9ab0dcbce6cc3a8f75c8a66603290cd1f78888e58f8bac2e873c2d3b9910d3f90f8f9af8d70aa5f02da45059c096ff7b0257615b76ff5d737574de19e7965abc39270768ebe686731d2247e1dfc6dd251f1028a6c70890b964c52943af0ff674d98c3f2c8dce108db2ee50acbe51f5cf53bfd0ae914c7ec478e2e21eb535e4944749bd167941df48c8b3bd8599a9f5fd47affd3eb262f51f66975fa973e8c54286a6f3dea2d79f7fa6a5a783d22118e09287069ec77f8b593cd19baa33eb80f528faffa749cee8b0ea778724de6c2ecc1b991e3b6bc4dd37dd9b81764159ea76e5f562a91e984caee15d3c7f6278237e0381f30b9550fbd2f15f561c87aa06d4eb20cb651845aadd93355faafa44f4676af65eb9019a8d4b6c689c283f83345d5f07cb1c2f3309bf3d55016290c8b63896731bcc08bca2a3996c58597a10c4fabebb934477c7b4779221719b9c548e50aad901853a6fecd561e3ecee4bbbcfc9e65651eb43ebbc9bc4b1a5b94d070a69e2305b21cc3eff5079ecdf1325cac56e4cbea5a9185e3e7551fa78538b27c9321096cf6087e5a2c8233d013ef25a9a2a619448b5227e580e26fc267f8c73bbcc42558eac0b80e3b55d4d8ff58bd05dee8ae18395b430a2558ee7248'


const fetchData = async (setDeals, allDeals = false, page = 1) => {

    try {
        const limit = allDeals ? '5' : ''
        const response = await axios.get(`/api/v4/leads?limit=${limit}&page=${page}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });



        if (!allDeals) {
            setDeals(response.data._embedded.leads);
        } else {
            setDeals(prevDeals => [...prevDeals, ...response.data._embedded.leads]);
        }


        if (allDeals && response.data._embedded.leads.length > 4) {
            await delay(500);
            await fetchData(setDeals, true, page + 1);
        }

    } catch (error) {
        console.error('Ошибка при получении данных о сделках:', error);
    }
};

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};


export default fetchData;