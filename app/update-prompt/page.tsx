"use client";

import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';

// Add this to disable pre-rendering for this page
export const dynamic = 'force-dynamic';

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id'); // Ensure this runs only on the client

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  useEffect(() => {
    if (!promptId) return;

    const getPromptDetails = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();

        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      } catch (error) {
        console.error('Failed to fetch prompt details:', error);
      }
    };

    getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert('Prompt ID not found');

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Failed to update prompt:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Suspense fallback={<div>Loading prompt details...</div>}>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </Suspense>
  );
};

export default EditPrompt;
