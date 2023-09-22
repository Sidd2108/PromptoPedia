import React from 'react'

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
    return (
        <section className='w-full max-w-full flex-start flex-col'>
            <h1 className='head_text text-left'>
                <span className='blue_gradient'>{type} Post</span>
            </h1>

            <p className='desc text-left max-w-md'>
                {type} and share amazing prompts with the world, and let your imagination run wild with generative AI!
            </p>
        </section>
    )
}

export default Form

//YT at 1:55