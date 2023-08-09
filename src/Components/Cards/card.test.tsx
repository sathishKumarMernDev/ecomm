// Generated by CodiumAI
import React from 'react'
import { render } from "@testing-library/react";
import ImageCard from ".";

describe('ImageCard', () => {

    // Tests that ImageCard component renders correctly with valid props
    it('should render correctly with valid props', () => {
        const props = {
            category: 'electronics',
            description: 'Lorem ipsum dolor sit amet',
            id: 1,
            _id: '1234',
            image: 'https://example.com/image.jpg',
            price: 100,
            rating: { rate: 4.5, count: 10 },
            title: 'Product Title'
        };
        const wrapper = render(<ImageCard {...props} />);
        expect(wrapper).toMatchSnapshot();
    });


});