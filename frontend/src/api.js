const BASE = '/api'

const headers = (token) => ({
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Token ${token}` } : {}),
})

const throwIfError = async (res) => {
    if (!res.ok) {
        let msg = res.statusText
        try {
            const json = await res.json()
            msg = Object.values(json).flat().join(' ')
        } catch (_) { }
        throw new Error(msg)
    }
    return res
}

export const api = {
    async login(username, password) {
        const res = await throwIfError(
            await fetch(`${BASE}/auth/login/`, {
                method: 'POST',
                headers: headers(),
                body: JSON.stringify({ username, password }),
            })
        )
        return res.json()
    },

    async register(data) {
        const res = await throwIfError(
            await fetch(`${BASE}/auth/register/`, {
                method: 'POST',
                headers: headers(),
                body: JSON.stringify(data),
            })
        )
        return res.json()
    },

    async getRooms() {
        const res = await throwIfError(await fetch(`${BASE}/rooms/`))
        return res.json()
    },

    async getBookings(token, { date, mine } = {}) {
        const params = new URLSearchParams()
        if (date) params.set('date', date)
        if (mine) params.set('mine', '1')
        const res = await throwIfError(
            await fetch(`${BASE}/bookings/?${params}`, { headers: headers(token) })
        )
        return res.json()
    },

    async createBooking(token, data) {
        const res = await throwIfError(
            await fetch(`${BASE}/bookings/`, {
                method: 'POST',
                headers: headers(token),
                body: JSON.stringify(data),
            })
        )
        return res.json()
    },

    async deleteBooking(token, id) {
        await throwIfError(
            await fetch(`${BASE}/bookings/${id}/`, {
                method: 'DELETE',
                headers: headers(token),
            })
        )
    },
}
