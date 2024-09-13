import { http, HttpResponse } from 'msw'
import { render, screen } from '../../../test-utils/testing-library-utils'
import OrderEntry from '../OrderEntry'
import { server } from '../../../mocks/server'
import { logRoles } from '../../../test-utils/testing-library-utils'
 
describe('Tests for OrderEntry', () => {
  it('handle error for scoops and toppings routes', async () => {
    server.resetHandlers(
      http.get("http://localhost:3030/scoops", () => {
        return new HttpResponse(null, { status: 500 })
      }),
      http.get("http://localhost:3030/toppings", () => {
        return new HttpResponse(null, { status: 500 })
      })
    )

    // render(<OrderEntry />)
    const { container } = render(<OrderEntry />)

    const alerts = await screen.findAllByText('An unexpected error occurred. Please try again later.')
    expect(alerts).toHaveLength(2)

    logRoles(container)
  })
})