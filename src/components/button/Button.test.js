import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders a button with a text', () =>{
    render(<Button>Test</Button>);

    const ButtonEl = screen.getByText('Test');

    expect(ButtonEl).toBeInTheDocument();
})