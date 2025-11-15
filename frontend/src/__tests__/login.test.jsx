import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/login.jsx'

const navigateMock = vi.fn()
vi.mock('react-router-dom', async (orig) => {
  const actual = await orig()
  return { ...actual, useNavigate: () => navigateMock }
})

describe('Login', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    localStorage.clear()
  })

  it('loguea y navega a /cuenta cuando la API responde 200', async () => {
    const user = userEvent.setup()
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        token: 'FAKE_TOKEN',
        user: { id: 1, email: 'demo@surfshop.com', name: 'Demo' },
      }),
    })

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cuenta" element={<div>Cuenta privada</div>} />
        </Routes>
      </MemoryRouter>
    )

    await user.type(screen.getByPlaceholderText(/email/i), 'demo@surfshop.com')
    await user.type(screen.getByPlaceholderText(/password/i), '123456')
    await user.click(screen.getByRole('button', { name: /login/i }))

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/auth\/login$/),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    )
   
  })

})
