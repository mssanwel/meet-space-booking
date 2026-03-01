import { useState } from 'react'
import { api } from '../api'

export default function BookingModal({ room, token, onClose, onBooked }) {
    const [form, setForm] = useState({ title: '', start_time: '', end_time: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await api.createBooking(token, {
                room: room.id,
                title: form.title,
                start_time: new Date(form.start_time).toISOString(),
                end_time: new Date(form.end_time).toISOString(),
            })
            onBooked()
            onClose()
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal">
                <div className="modal-header">
                    <div>
                        <div className="modal-title">Book a Room</div>
                        <div className="modal-sub">📍 {room.name} · {room.location}</div>
                    </div>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>

                {error && <div className="msg msg-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Meeting Title</label>
                        <input
                            id="booking-title"
                            className="form-input"
                            placeholder="e.g. Sprint Planning"
                            value={form.title}
                            onChange={e => set('title', e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Start Time</label>
                            <input
                                id="booking-start"
                                type="datetime-local"
                                className="form-input"
                                value={form.start_time}
                                onChange={e => set('start_time', e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">End Time</label>
                            <input
                                id="booking-end"
                                type="datetime-local"
                                className="form-input"
                                value={form.end_time}
                                onChange={e => set('end_time', e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Booking…' : 'Confirm Booking'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
