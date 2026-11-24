'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { createChat } from '@shadcn/helpers/ai-sdk';
import {
  lastAssistantMessageIsCompleteWithApprovalResponses,
  type UIMessage,
} from 'ai';
import { IconCheck, IconLock } from '@tabler/icons-react';
import { diagramTone } from '@/app/components/Diagram';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// A scripted replay of the cart question, played through the AI SDK. No model
// runs. The products and the question are the ones in the cart explainer still.

type CartMessage = UIMessage<
  unknown,
  Record<string, never>,
  { fillCart: { input: { items: string[] }; output: { added: boolean } } }
>;

const items = [
  'Potted coriander',
  'Sesame oil 100 ml',
  'Yellow onions 1.5 kg',
  'Aged cheddar 400 g',
];

const script = createChat<CartMessage>()
  .user("Fill the cart from this week's shopping list.")
  .assistant(({ writer }) => {
    writer.text('I picked a product for every line. Here are four of them.');
    writer.tool('fillCart', {
      input: { items },
      needsApproval: true,
      output: { added: true },
    });
  })
  .assistant(({ writer, toolCall }) => {
    writer.text(
      toolCall?.approved
        ? 'Everything is in your Mathem cart. No order was placed. You place it yourself in the Mathem app.'
        : 'Nothing was added to your cart. I only fill it after a clear yes.'
    );
  });

const bubble =
  'w-fit max-w-[85%] rounded-[20px] corner-squircle border px-4 py-2 text-sm leading-relaxed';

function Conversation({
  reducedMotion,
  onRestart,
}: {
  reducedMotion: boolean;
  onRestart: () => void;
}) {
  const [transport] = useState(() =>
    script.transport({ delayMs: reducedMotion ? 0 : 50 })
  );
  const { messages, sendMessage, addToolApprovalResponse, status } =
    useChat<CartMessage>({
      transport,
      sendAutomaticallyWhen:
        lastAssistantMessageIsCompleteWithApprovalResponses,
    });

  // The ref keeps Strict Mode's second effect run from sending twice
  const started = useRef(false);
  // The clicked button unmounts, so focus moves to the region instead of <body>
  const region = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (started.current) {
      return;
    }
    started.current = true;
    region.current?.focus();
    const first = script.next([]);
    if (first) {
      void sendMessage(first);
    }
  }, [sendMessage]);

  const answer = (id: string, approved: boolean) => {
    region.current?.focus();
    void addToolApprovalResponse({ id, approved });
  };

  const settled = status === 'ready';
  const reply = messages.at(-1);
  const parts = reply?.role === 'assistant' ? reply.parts : [];
  const tool = parts.find(part => part.type === 'tool-fillCart');
  const done =
    settled &&
    (tool?.state === 'output-available' || tool?.state === 'output-denied');
  const lastText = parts.findLast(part => part.type === 'text')?.text ?? '';
  const asking = tool?.state === 'approval-requested';

  return (
    <div
      ref={region}
      role="group"
      aria-label="Scripted demo of the cart question"
      tabIndex={-1}
      className="rounded-[20px] corner-squircle border border-foreground/5 bg-secondary p-4 outline-none sm:p-6"
    >
      <p className="mb-4 text-xs tracking-wide text-muted-foreground">
        Scripted demo, no AI model is running
      </p>

      {/* Announced once per finished reply. The text above it streams word by
          word, which a live region would read out in pieces. */}
      <p role="status" className="sr-only">
        {settled &&
          lastText &&
          `${lastText}${asking ? ' Shall I put everything in the Mathem cart now?' : ''}`}
      </p>

      <div className="flex flex-col gap-3">
        {messages.map(message =>
          message.parts.map((part, i) => {
            const key = `${message.id}-${i}`;

            if (part.type === 'text') {
              return (
                <p
                  key={key}
                  className={cn(
                    bubble,
                    message.role === 'user'
                      ? cn(diagramTone.you, 'self-end')
                      : diagramTone.agent
                  )}
                >
                  {part.text}
                </p>
              );
            }

            if (part.type !== 'tool-fillCart' || !part.input) {
              return null;
            }

            const added = part.state === 'output-available';
            const { approval } = part;

            return (
              <div
                key={key}
                className={cn(
                  bubble,
                  diagramTone.agent,
                  'w-full space-y-3 py-4'
                )}
              >
                <ul className="space-y-1">
                  {part.input.items?.map(item => (
                    <li key={item} className="flex items-center gap-2">
                      {added && (
                        <IconCheck size={16} stroke={1.5} aria-hidden="true" />
                      )}
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="font-medium text-surface-dark-foreground">
                  Shall I put everything in the Mathem cart now?
                </p>
                {part.state === 'approval-requested' && settled && approval && (
                  <div className="flex gap-2">
                    <Button
                      className="min-h-11 min-w-20 rounded-[8px] corner-squircle hover:bg-primary-600"
                      onClick={() => answer(approval.id, true)}
                    >
                      Yes
                    </Button>
                    <Button
                      variant="outline"
                      className="min-h-11 min-w-20 rounded-[8px] corner-squircle dark:border-foreground/20"
                      onClick={() => answer(approval.id, false)}
                    >
                      No
                    </Button>
                  </div>
                )}
                {approval?.approved !== undefined && (
                  <p>You answered {approval.approved ? 'Yes' : 'No'}.</p>
                )}
                {added && (
                  <p className="flex items-center gap-2">
                    <IconLock size={16} stroke={1.5} aria-hidden="true" />
                    Checkout stays locked
                  </p>
                )}
              </div>
            );
          })
        )}
      </div>

      {done && (
        <Button
          variant="outline"
          className="mt-4 min-h-11 rounded-[8px] corner-squircle dark:border-foreground/20"
          onClick={onRestart}
        >
          Start over
        </Button>
      )}
    </div>
  );
}

export default function CartDemo({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const [run, setRun] = useState(0);

  return (
    <Conversation
      key={run}
      reducedMotion={reducedMotion}
      onRestart={() => setRun(run + 1)}
    />
  );
}
