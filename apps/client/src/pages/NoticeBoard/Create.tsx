import { useActionState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// Define the shape of our form state
interface CreateNoticeState {
  message: string;
  error?: string;
  success?: boolean;
}

// Initial state
const initialState: CreateNoticeState = {
  message: '',
  success: false,
};

// Server action (simulated related to the server endpoint we will build)
// In a real server component this would be 'use server', but since we are in Vite client-side
// we just define the action function here that calls the API.
async function createNoticeAction(
  _prevState: CreateNoticeState,
  formData: FormData,
): Promise<CreateNoticeState> {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  if (!title || !content) {
    return {
      message: 'Title and content are required.',
      error: 'Validation Error',
      success: false,
    };
  }

  try {
    const response = await fetch('/api/notice-board', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
      throw new Error('Failed to create notice');
    }

    return {
      message: 'Notice created successfully!',
      success: true,
    };
  } catch (error) {
    return {
      message:
        error instanceof Error
          ? error.message
          : 'Unknown error occurred',
      error: 'Network Error',
      success: false,
    };
  }
}

export default function CreateNoticePage() {
  const [state, formAction, isPending] = useActionState(
    createNoticeAction,
    initialState,
  );

  return (
    <div className="container mx-auto max-w-2xl px-4 py-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create New Notice
          </CardTitle>
          <CardDescription>
            Fill out the form below to post a new notice to the board.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Notice Title"
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="content"
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                placeholder="Write your notice content here..."
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[150px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>

            {state.message && (
              <div
                className={`rounded-md p-4 text-sm ${state.success ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`}
              >
                {state.message}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? 'Creating...' : 'Create Notice'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
