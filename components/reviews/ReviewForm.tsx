"use client";

import { PenLine } from "lucide-react";
import { useState } from "react";
import { Button, Input, Modal, StarInput, TextArea, useToast } from "@/components/core";

export function ReviewForm() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  const submit = () => {
    if (!name.trim() || !text.trim()) {
      toast.error("Please add your name and a few words.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setOpen(false);
      setName("");
      setText("");
      setRating(5);
      toast.success("Thanks! Your review has been submitted for approval.", "Review received");
    }, 700);
  };

  return (
    <>
      <Button variant="secondary" leftIcon={<PenLine className="size-4" />} onClick={() => setOpen(true)}>
        Write a review
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Share your experience"
        description="Your feedback helps others find a great barber."
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={submit} loading={submitting}>
              Submit review
            </Button>
          </>
        }
      >
        <div className="space-y-5">
          <div>
            <p className="mb-1.5 text-sm font-medium text-foreground">Your rating</p>
            <StarInput value={rating} onChange={setRating} />
          </div>
          <Input label="Your name" placeholder="e.g. Ahmed R." value={name} onChange={(e) => setName(e.target.value)} />
          <TextArea
            label="Your review"
            placeholder="Tell us about your cut, your barber, the vibe…"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </Modal>
    </>
  );
}
