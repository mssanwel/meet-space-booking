import { useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'

export default function LoginPage({ onLogin }) {
    const [form, setForm] = useState({ username: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const data = await api.login(form.username, form.password)
            onLogin(data.token, form.username)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-wrap">
            <div className="auth-card">
                <h1 className="auth-title">Welcome back</h1>
                <p className="auth-subtitle">Sign in to book your meeting room</p>

                {error && <div className="msg msg-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input id="login-username" className="form-input" placeholder="your_username"
                            value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input id="login-password" type="password" className="form-input" placeholder="••••••••"
                            value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required />
                    </div>
                    <button id="login-submit" type="submit" className="btn btn-primary btn-full" disabled={loading}>
                        {loading ? 'Signing in…' : 'Sign In'}
                    </button>
                </form>

                <div className="auth-footer">
                    No account? <Link to="/register">Create one</Link>
                </div>
            </div>
        </div>
    )
}
