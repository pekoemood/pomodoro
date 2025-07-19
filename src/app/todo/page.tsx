"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import type { Todo } from "@/lib/types";

export default function Home() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [inputValue, setInputValue] = useState("");

	const addTodo = () => {
		if (inputValue.trim() !== "") {
			const newTodo: Todo = {
				id: crypto.randomUUID(),
				title: inputValue.trim(),
				completed: false,
				createdAt: new Date(),
			};
			setTodos([...todos, newTodo]);
			setInputValue("");
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			addTodo();
		}
	};

	const toggleTodo = (id: string) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo,
			),
		);
	};

	const deleteTodo = (id: string) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	return (
		<div className="min-h-screen bg-background p-4">
			<div className="max-w-md mx-auto">
				<h1 className="text-2xl font-bold mb-6 text-center">TODOアプリ</h1>

				<Card className="p-4 mb-6">
					<div className="flex gap-2">
						<Input
							placeholder="新しいTODOを入力"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							onKeyDown={handleKeyDown}
						/>
						<Button onClick={addTodo}>追加</Button>
					</div>
				</Card>

				<div className="space-y-2">
					{todos.map((todo) => (
						<Card key={todo.id} className="p-4">
							<div className="flex items-center gap-3">
								<Checkbox
									checked={todo.completed}
									onCheckedChange={() => toggleTodo(todo.id)}
								/>
								<span
									className={`flex-1 ${todo.completed ? "line-through text-muted-foreground" : ""}`}
								>
									{todo.title}
								</span>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => deleteTodo(todo.id)}
									className="text-destructive hover:text-destructive"
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						</Card>
					))}
				</div>

				{todos.length === 0 && (
					<div className="text-center text-muted-foreground mt-8">
						まだTODOがありません
					</div>
				)}
			</div>
		</div>
	);
}
