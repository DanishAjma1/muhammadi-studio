"use client";

import { Bell, CalendarPlus, CalendarX, CheckCheck, Star, UserPlus } from "lucide-react";
import { Button, EmptyState } from "@/components/core";
import { useNotifications } from "@/hooks";
import { cn } from "@/lib/utils";
import type { NotificationType } from "@/types";

const config: Record<NotificationType, { icon: typeof Bell; accent: string }> = {
  appointment: { icon: CalendarPlus, accent: "text-success bg-success/10" },
  cancellation: { icon: CalendarX, accent: "text-error bg-error/10" },
  customer: { icon: UserPlus, accent: "text-info bg-info/10" },
  review: { icon: Star, accent: "text-gold bg-gold/10" },
  reminder: { icon: Bell, accent: "text-warning bg-warning/10" },
};

export default function AdminNotificationsPage() {
  const { notifications, unreadCount, markRead, markAllRead } = useNotifications();

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">
          {unreadCount > 0 ? `${unreadCount} unread` : "You're all caught up"}
        </p>
        {unreadCount > 0 && (
          <Button size="sm" variant="secondary" leftIcon={<CheckCheck className="size-4" />} onClick={markAllRead}>
            Mark all read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState icon={<Bell className="size-6" />} title="No notifications" />
      ) : (
        <div className="space-y-2">
          {notifications.map((n) => {
            const cfg = config[n.type];
            return (
              <button
                key={n.id}
                onClick={() => markRead(n.id)}
                className={cn(
                  "flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-colors",
                  n.read ? "border-border bg-card" : "border-gold/30 bg-gold/5",
                )}
              >
                <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl", cfg.accent)}>
                  <cfg.icon className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{n.title}</p>
                    {!n.read && <span className="size-2 rounded-full bg-gold" />}
                  </div>
                  <p className="mt-0.5 text-sm text-muted">{n.message}</p>
                  <p className="mt-1 text-xs text-faint">{n.time}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
