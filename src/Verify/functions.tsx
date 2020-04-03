export const fetchVerification = async (id: string | undefined) => {
    console.log('Fetching verification...')
    try {
        const query = await fetch(
            'https://treemotion.herokuapp.com/user/verify',
            {
                method: 'POST',
                body: JSON.stringify({
                    token: id
                }),
                headers: { 'Content-type': 'application/json' }
            }
        )
        const res = await query.json()
        return res
    }
    catch(e) {
        console.log(e.message)
        return false
    }
}
