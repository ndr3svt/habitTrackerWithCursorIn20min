import { serve } from "bun";

interface Habit {
  id: string;
  name: string;
  completed: boolean;
  date: string;
  sector: string;
  unit?: string;
  quantity?: number;
  targetQuantity?: number;
  order: number;
  streak: number;
  history: {
    date: string;
    completed: boolean;
    quantity?: number;
  }[];
}

const server = serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/") {
      return new Response(Bun.file("public/index.html"));
    }

    if (url.pathname === "/api/habits") {
      if (req.method === "GET") {
        const habits: Habit[] = await Bun.file("data/habits.json").json();
        return Response.json(habits);
      }

      if (req.method === "POST") {
        const data = await req.json();
        const habits: Habit[] = await Bun.file("data/habits.json").json();
        const newHabit: Habit = {
          ...data,
          id: crypto.randomUUID(),
          order: habits.length,
          streak: 0,
          history: []
        };
        habits.push(newHabit);
        await Bun.write("data/habits.json", JSON.stringify(habits, null, 2));
        return Response.json(habits);
      }

      if (req.method === "PUT") {
        const data: Habit = await req.json();
        const habits: Habit[] = await Bun.file("data/habits.json").json();
        const habitIndex = habits.findIndex((h: Habit) => h.id === data.id);
        
        // Update streak
        if (data.completed && !habits[habitIndex].completed) {
          data.streak = (habits[habitIndex].streak || 0) + 1;
        } else if (!data.completed && habits[habitIndex].completed) {
          data.streak = 0;
        }

        // Update history
        const today = new Date().toISOString().split('T')[0];
        const historyEntry = {
          date: today,
          completed: data.completed,
          quantity: data.quantity
        };

        if (!data.history) {
          data.history = [historyEntry];
        } else {
          const existingEntryIndex = data.history.findIndex(h => h.date === today);
          if (existingEntryIndex >= 0) {
            data.history[existingEntryIndex] = historyEntry;
          } else {
            data.history.push(historyEntry);
          }
        }

        habits[habitIndex] = data;
        await Bun.write("data/habits.json", JSON.stringify(habits, null, 2));
        return Response.json(habits);
      }

      if (req.method === "PATCH") {
        const data = await req.json();
        const habits: Habit[] = await Bun.file("data/habits.json").json();
        
        // Update order of habits
        data.forEach((update: { id: string; order: number }) => {
          const habit = habits.find((h: Habit) => h.id === update.id);
          if (habit) {
            habit.order = update.order;
          }
        });

        await Bun.write("data/habits.json", JSON.stringify(habits, null, 2));
        return Response.json(habits);
      }
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server running at http://localhost:${server.port}`); 