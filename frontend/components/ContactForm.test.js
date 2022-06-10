import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm/>);
});

test('renders the contact form header', () => {
    render(<ContactForm/>);

    const headerElem = screen.queryByText(/Contact Form/i);
    
    expect(headerElem).toBeInTheDocument();
    expect(headerElem).toBeTruthy();
    expect(headerElem).toHaveTextContent(/Contact Form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);

    const firstNameField = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstNameField, '123');

    const errorMessages = await screen.findAllByTestId('error');
    expect(errorMessages).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    await waitFor(()=>{
        const errorMessages = screen.queryAllByTestId('error');
        expect(errorMessages).toHaveLength(3);
    });
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);

    const firstNameField = screen.getByLabelText(/first name*/i);
        userEvent.type(firstNameField, 'Whatever');

    const lastNameField = screen.getByLabelText(/last name*/i);
        userEvent.type(lastNameField, 'Whatever');
    
    const button = screen.getByRole('button');
        userEvent.click(button);

    const errorMessages = await screen.getAllByTestId('error');
        expect(errorMessages).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);

    const emailField = screen.getByLabelText(/email*/i);
        userEvent.type(emailField, 'alex@email');

    const errorMessage = await screen.findByText(/email must be a valid email address/i);
        expect(errorMessage).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);

     const button  = screen.getByRole('button');
        userEvent.click(button);

    const errorMessage = await screen.findByText(/lastName is a required field/i);
        expect(errorMessage).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);

    const firstNameField = screen.getByLabelText(/first name*/i);
        userEvent.type(firstNameField, "firstname");

    const lastNameField = screen.getByLabelText(/last name*/i);
        userEvent.type(lastNameField, "lastname");

    const emailField = screen.getByLabelText(/email*/i);
        userEvent.type(emailField, "alexaymond@email.com");

    const submitBtn = screen.getByRole("button");
        userEvent.click(submitBtn);

    await waitFor(() => {
        const firstNameDisplay = screen.queryByText("firstname");
        const lastNameDisplay = screen.queryByText("lastname");
        const emailDisplay = screen.queryByText("alexaymond@email.com");
        const messageDisplay = screen.queryByTestId("messageDisplay");

        expect(firstNameDisplay).toBeInTheDocument();
        expect(lastNameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).not.toBeInTheDocument();
    });
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);

    const firstNameField = screen.getByLabelText(/first name*/i);
        userEvent.type(firstNameField, 'alexander');

    const lastNameField = screen.getByLabelText(/last name*/i);
        userEvent.type(lastNameField, 'aymond');

    const emailField = screen.getByLabelText(/email*/i);
        userEvent.type(emailField, 'email@email.com');

    const messageField = screen.getByLabelText(/Message/i);
        userEvent.type(messageField, 'this is a message');

    const submitBtn = screen.getByRole('button');
        userEvent.click(submitBtn);

    await waitFor(() => {
        const firstNameDisplay = screen.queryByText("alexander");
        const lastNameDisplay = screen.queryByText("aymond");
        const emailDisplay = screen.queryByText("email@email.com");
        const messageDisplay = screen.queryByText("this is a message");

        expect(firstNameDisplay).toBeInTheDocument();
        expect(lastNameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).toBeInTheDocument();
    });
});
