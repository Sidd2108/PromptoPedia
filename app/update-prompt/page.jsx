'use client';
import Form from '@components/Form'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'


const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: ""
    });

    useEffect(() => {
        const getPrompt = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            console.log(data);
            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }
        if (promptId) getPrompt();
    }, [promptId]);

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={() => { }}

        />
    )
}

export default EditPrompt;

//YT at 3:00