"use server";

import { prisma } from "../prisma";
import { z } from "zod";

// Validation schema for events
const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  date: z.string().datetime("Invalid date format"),
  location: z.string().min(1, "Location is required"),
});

type EventInput = z.infer<typeof eventSchema>;

export async function getEvents(userId: string, role: 'USER' | 'ADMIN') {
  try {
    let events;
    if (role === 'ADMIN') {
      events = await prisma.event.findMany({
        orderBy: {
          date: 'desc',
        },
      });
    } else {
      events = await prisma.event.findMany({
        where: {
          userId: userId,
        },
        orderBy: {
          date: 'desc',
        },
      });
    }

    return {
      success: true,
      message: "Events retrieved successfully",
      data: events.map(event => ({
        id: event.id,
        title: event.title,
        description: event.description,
        date: event.date.toISOString(),
        location: event.location,
        userId: event.userId,
      })),
    };
  } catch (error) {
    console.error("Event retrieval error:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}

export async function modifyEvent(eventId: string, data: EventInput, userId: string, role: 'USER' | 'ADMIN') {
  const parsed = eventSchema.safeParse(data);
  if (!parsed.success) {
    const errorMessages = parsed.error.errors.map((err) => err.message).join(", ");
    return { success: false, message: errorMessages };
  }

  try {
    let existingEvent;
    if (role === 'ADMIN') {
      existingEvent = await prisma.event.findUnique({
        where: { id: eventId },
      });
    } else {
      existingEvent = await prisma.event.findFirst({
        where: {
          id: eventId,
          userId: userId,
        },
      });
    }

    if (!existingEvent) {
      return { 
        success: false, 
        message: "Event not found or you don't have permission to modify it" 
      };
    }

    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: {
        title: data.title,
        description: data.description,
        date: new Date(data.date),
        location: data.location,
      },
    });

    return {
      success: true,
      message: "Event updated successfully",
      data: {
        id: updatedEvent.id,
        title: updatedEvent.title,
        description: updatedEvent.description,
        date: updatedEvent.date.toISOString(),
        location: updatedEvent.location,
        userId: updatedEvent.userId,
      },
    };
  } catch (error) {
    console.error("Event update error:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}

export async function deleteEvent(eventId: string, userId: string, role: 'USER' | 'ADMIN') {
  try {
    let event;
    if (role === 'ADMIN') {
      event = await prisma.event.findUnique({
        where: { id: eventId },
      });
    } else {
      event = await prisma.event.findFirst({
        where: {
          id: eventId,
          userId: userId,
        },
      });
    }

    if (!event) {
      return { 
        success: false, 
        message: "Event not found or you don't have permission to delete it" 
      };
    }

    await prisma.event.delete({
      where: { id: eventId },
    });

    return {
      success: true,
      message: "Event deleted successfully",
    };
  } catch (error) {
    console.error("Event deletion error:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}

export async function addEvent(data: EventInput & { userId: string }) {
  const parsed = eventSchema.safeParse(data);
  if (!parsed.success) {
    const errorMessages = parsed.error.errors.map((err) => err.message).join(", ");
    return { success: false, message: errorMessages };
  }

  try {
    const event = await prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        date: new Date(data.date),
        location: data.location,
        userId: data.userId,
      },
    });

    return {
      success: true,
      message: "Event created successfully",
      data: {
        id: event.id,
        title: event.title,
        description: event.description,
        date: event.date.toISOString(),
        location: event.location,
        userId: event.userId,
      },
    };
  } catch (error) {
    console.error("Event creation error:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}

