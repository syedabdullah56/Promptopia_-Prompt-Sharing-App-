// app/update-prompt/page.tsx

"use client"; // Ensure this file is treated as a Client Component

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  // Effect to fetch prompt details
  useEffect(() => {
    const getPromptDetails = async () => {
      if (!promptId) return; // If no promptId, do nothing

      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        if (!response.ok) throw new Error('Failed to fetch prompt details');
        
        const data = await response.json();
        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      } catch (error) {
        console.error('Error fetching prompt details:', error);
      }
    };

    getPromptDetails();
  }, [promptId]);

  // Function to update the prompt
  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) {
      alert('Prompt ID not found');
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        router.push('/');
      } else {
        throw new Error('Failed to update prompt');
      }
    } catch (error) {
      console.error('Error updating prompt:', error);
    } finally {
      setSubmitting(false);
    }
  };

  // Render the form directly without Suspense
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
