import { useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'

export default function RegisterPage({ onLogin }) {
    const [form, setForm] = useState({ username: '', password: '', email: '', first_name: '', last_name: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const data = await api.register(form)
            onLogin(data.token, data.username)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-wrap">
            <div className="auth-card">
                <h1 className="auth-title">Create account</h1>
                <p className="auth-subtitle">Join your team on MeetSpace</p>

                {error && <div className="msg msg-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">First Name</label>
                            <input id="reg-first" className="form-input" placeholder="Jane"
                                value={form.first_name} onChange={e => set('first_name', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Last Name</label>
                            <input id="reg-last" className="form-input" placeholder="Doe"
                                value={form.last_name} onChange={e => set('last_name', e.target.value)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input id="reg-email" type="email" className="form-input" placeholder="jane@company.com"
                            value={form.email} onChange={e => set('email', e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input id="reg-username" className="form-input" placeholder="jane_doe"
                            value={form.username} onChange={e => set('username', e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input id="reg-password" type="password" className="form-input" placeholder="••••••••"
                            value={form.password} onChange={e => set('password', e.target.value)} required />
                    </div>
                    <button id="reg-submit" type="submit" className="btn btn-primary btn-full" disabled={loading}>
                        {loading ? 'Creating account…' : 'Create Account'}
                    </button>
                </form>

                <div className="auth-footer">
                    Already have an account? <Link to="/login">Sign in</Link>
                </div>
            </div>
        </div>
    )
}
