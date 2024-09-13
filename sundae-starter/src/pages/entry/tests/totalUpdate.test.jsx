import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

describe("total updates", () => {
  it('updates when scoops change', async () => {
    const user = userEvent.setup();
    render(<Options optionType="scoops" />);

    // make sure total starts out $0.00
    const scoopsTotal = screen.getByText('Scoops total: $', { exact: false });
    expect(scoopsTotal).toHaveTextContent('0.00');

    // update Strawberry scoops to 1 and check the total
    const strawberryInput = await screen.findByRole('spinbutton', { name: 'Strawberry' });
    await user.clear(strawberryInput);
    await user.type(strawberryInput, '1');
    expect(scoopsTotal).toHaveTextContent('1.00');

    // update chocolate scoops to 2 and check the total
    const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
    await user.clear(chocolateInput);
    await user.type(chocolateInput, '2');
    expect(scoopsTotal).toHaveTextContent('3.00');
  })
})