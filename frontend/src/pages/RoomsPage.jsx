import { useEffect, useState } from 'react'
import { api } from '../api'
import BookingModal from '../components/BookingModal'

export default function RoomsPage({ token }) {
    const [rooms, setRooms] = useState([])
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedRoom, setSelectedRoom] = useState(null)
    const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
    const [success, setSuccess] = useState('')

    const load = async () => {
        try {
            const [r, b] = await Promise.all([
                api.getRooms(),
                api.getBookings(token, { date }),
            ])
            setRooms(r.results ?? r)
            setBookings(b.results ?? b)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { setLoading(true); load() }, [date])

    const isBooked = (roomId) => bookings.some(b => b.room === roomId)

    const handleBooked = () => {
        setSuccess('Room booked successfully! 🎉')
        load()
        setTimeout(() => setSuccess(''), 3000)
    }

    return (
        <main className="page">
            <div className="page-header">
                <h1 className="page-title">Browse Rooms</h1>
                <p className="page-desc">Select a date and pick an available meeting room.</p>
            </div>

            {success && <div className="msg msg-success">{success}</div>}

            <div className="controls-bar">
                <label className="date-label" htmlFor="room-date">📅 Date:</label>
                <input
                    id="room-date"
                    type="date"
                    className="form-input"
                    style={{ width: 'auto' }}
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="spinner-wrap"><div className="spin" /><span>Loading rooms…</span></div>
            ) : rooms.length === 0 ? (
                <div className="empty"><div className="empty-icon">🚪</div><p>No rooms found.</p></div>
            ) : (
                <div className="rooms-grid">
                    {rooms.map(room => (
                        <div key={room.id} className="room-card" onClick={() => setSelectedRoom(room)}>
                            <div className="room-name">{room.name}</div>
                            <div className="room-location">📍 {room.location}</div>
                            <div className="room-badges">
                                <span className="badge">👥 {room.capacity} seats</span>
                                {isBooked(room.id)
                                    ? <span className="badge" style={{ color: 'var(--danger)', borderColor: 'rgba(239,68,68,.3)' }}>● Partially booked</span>
                                    : <span className="badge" style={{ color: 'var(--success)', borderColor: 'rgba(34,197,94,.3)' }}>● Available</span>
                                }
                            </div>
                            {room.description && (
                                <p className="room-desc room-desc-clamp">{room.description}</p>
                            )}
                            <button className="btn btn-primary btn-sm">Book Now →</button>
                        </div>
                    ))}
                </div>
            )}

            {selectedRoom && (
                <BookingModal
                    room={selectedRoom}
                    token={token}
                    onClose={() => setSelectedRoom(null)}
                    onBooked={handleBooked}
                />
            )}
        </main>
    )
}
