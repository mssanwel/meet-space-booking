import { useEffect, useState, useCallback } from 'react'
import { api } from '../api'

const fmt = (iso) =>
    new Date(iso).toLocaleString(undefined, {
        month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit',
    })

export default function MyBookingsPage({ token }) {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const load = useCallback(async () => {
        setLoading(true)
        try {
            const data = await api.getBookings(token, { mine: true })
            setBookings(data.results ?? data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [token])

    useEffect(() => { load() }, [load])

    const cancel = async (id) => {
        if (!window.confirm('Cancel this booking?')) return
        try {
            await api.deleteBooking(token, id)
            setBookings(bs => bs.filter(b => b.id !== id))
        } catch (err) {
            alert(err.message)
        }
    }

    const upcoming = bookings.filter(b => new Date(b.end_time) >= new Date())
    const past = bookings.filter(b => new Date(b.end_time) < new Date())

    return (
        <main className="page">
            <div className="page-header">
                <h1 className="page-title">My Bookings</h1>
                <p className="page-desc">Manage your upcoming and past meetings.</p>
            </div>

            {error && <div className="msg msg-error">{error}</div>}

            {loading ? (
                <div className="spinner-wrap"><div className="spin" /><span>Loading bookings…</span></div>
            ) : bookings.length === 0 ? (
                <div className="empty">
                    <div className="empty-icon">📭</div>
                    <p>No bookings yet. <a href="/rooms" style={{ color: 'var(--primary)' }}>Browse rooms →</a></p>
                </div>
            ) : (
                <>
                    {upcoming.length > 0 && (
                        <section style={{ marginBottom: 40 }}>
                            <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-2)', marginBottom: 16 }}>
                                UPCOMING ({upcoming.length})
                            </h2>
                            <div className="bookings-list">
                                {upcoming.map(b => (
                                    <div key={b.id} className="booking-card">
                                        <div className="booking-info">
                                            <div className="booking-title">{b.title}</div>
                                            <div className="booking-meta">
                                                <span className="booking-room">📍 {b.room_name}</span>
                                                <span>🕐 {fmt(b.start_time)} → {fmt(b.end_time)}</span>
                                            </div>
                                        </div>
                                        <button className="btn btn-danger btn-sm" onClick={() => cancel(b.id)}>Cancel</button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {past.length > 0 && (
                        <section>
                            <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-2)', marginBottom: 16 }}>
                                PAST ({past.length})
                            </h2>
                            <div className="bookings-list">
                                {past.map(b => (
                                    <div key={b.id} className="booking-card" style={{ opacity: .55 }}>
                                        <div className="booking-info">
                                            <div className="booking-title">{b.title}</div>
                                            <div className="booking-meta">
                                                <span className="booking-room">📍 {b.room_name}</span>
                                                <span>🕐 {fmt(b.start_time)} → {fmt(b.end_time)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </>
            )}
        </main>
    )
}
