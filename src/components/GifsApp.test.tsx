import { describe, test, expect } from 'vitest';
import GifsApp from './GifsApp';
import { render } from '@testing-library/react';

describe('GifsApp', () => {
    test('should render component properly', () => {
        const { container } = render(<GifsApp/>);

        expect(container).toMatchSnapshot();
    })
})