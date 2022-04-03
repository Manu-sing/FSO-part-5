import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RenderAll from './RenderAll'
import Form from './Form'


describe('renders the right content', () => {
  test('renders only title and author by default', () => {
    const blogs = [
      {
        title: 'This is the only blog that should be rendered',
        author: 'Jhonny Depp',
        url: 'https://fullstackopen.com/en/part5/testing_react_apps#searching-for-content-in-a-component',
        likes: 55,
        status: 'Read'
      }
    ]

    render(<RenderAll blogs={blogs} />)

    screen.getByText('This is the only blog that should be rendered')
    screen.getByText('Jhonny Depp')
    const element3 = screen.queryByText('https://fullstackopen.com/en/part5/testing_react_apps#searching-for-content-in-a-component')
    const element4 = screen.queryByText('Read')

    expect(element3).toBeNull()
    expect(element4).toBeNull()
  })

  test('when the show details button is clicked, it renders also url, likes and status', async () => {
    const blogs = [
      {
        title: 'This is the only blog that should be rendered',
        author: 'Jhonny Depp',
        url: 'https://fullstackopen.com/en/part5/testing_react_apps#searching-for-content-in-a-component',
        likes: 55,
        status: 'Read'
      }
    ]

    render(<RenderAll blogs={blogs} />)

    const button = screen.getByText('Show Details')
    await userEvent.click(button)

    screen.getByText('https://fullstackopen.com/en/part5/testing_react_apps#searching-for-content-in-a-component')
    screen.getByText(55)
    screen.getByText('Read')

  })
})

test('the event handler connected to the like button works as expected', async () => {
  const blogs = [
    {
      id: 1,
      title: 'This is the only blog that should be rendered',
      author: 'Jhonny Depp',
      url: 'https://fullstackopen.com/en/part5/testing_react_apps#searching-for-content-in-a-component',
      likes: 55,
      status: 'Read'
    }
  ]

  const mockHandler = jest.fn()

  render(<RenderAll blogs={blogs} addALike={mockHandler}/>)

  const showDetailsButton = screen.getByText('Show Details')
  await userEvent.click(showDetailsButton)

  const likeButton = screen.getByTitle('ciao')
  await userEvent.click(likeButton)
  await userEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)

})

test('the new blog form works as expected', async () => {
  const addBlog = jest.fn()

  const component = render(<Form createBlog={addBlog}/>)

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const link = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Let us see if the form works well' }
  })

  fireEvent.change(author, {
    target: { value: 'Emanuele Guarnaccia' }
  })

  fireEvent.change(link, {
    target: { value: 'https://fullstackopen.com/en/part5/testing_react_apps#exercises-5-13-5-16' }
  })

  fireEvent.submit(form)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('Let us see if the form works well')


})
