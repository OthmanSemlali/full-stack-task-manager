<?php

namespace App\Http\Controllers;

use App\Models\Task;

use Illuminate\Http\Request;

class TasksController extends Controller
{
    //

    public function getTasks()
    {
   
        $user = auth()->user();

        if (!$user) {
          
            return response()->json(['error' => 'Unauthorized'], 401);
        }

      
        $tasks = Task::where('user_id', $user->id)->get();

   
        return response()->json(['tasks' => $tasks]);
    }


    public function store(Request $request)
    {
        if(!auth()->user()){
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    
        $request->validate([
            'title' => 'required|string|max:255|unique:tasks,title,NULL,id,user_id,' . auth()->user()->id,
            'description' => 'nullable|string|max:1000',
            'isDone' => 'nullable|boolean',
        ], [
            'title.unique' => 'This title is already in your tasks list. ',
        ]);

        // Create a new task
        $task = Task::create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'isDone' => $request->input('isDone'),
            'user_id' => auth()->user()->id,
        ]);

      
        return response()->json(['task' => $task, 'message' => 'Task Added'], 201);
    }




    public function update($id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['error' => 'Task not found'], 404);
        }

        if (!auth()->user()) {
            return response()->json(['error' => 'Unauthorizedddd'], 401);
        }

        if ($task->user_id != auth()->user()->id) {
            return response()->json(['error' => 'You can only update your own tasks.'], 403);
        }

        try {
            $task->isDone = !$task->isDone;
            $task->save();
            return response()->json(['message' => 'Task updated successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update task'], 500);
        }
    }

    public function destroy($id)
    {
        $task = Task::find($id);

        
        if (!$task) {
            return response()->json(['error' => 'Task not found'], 404);
        }

  
        if (!auth()->user()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        if ($task->user_id != auth()->user()->id) {
            return response()->json(['error' => 'You can only delete your own tasks.'], 403);
        }
      

        try {
            $task->delete();
            return response()->json(['message' => 'Task deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete task'], 500);
        }
    }
}
