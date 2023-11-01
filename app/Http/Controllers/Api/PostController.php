<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $orderByDirection = $request->input('order_direction','desc');
        $orderByColumn = $request->input('order_column','id');

        if(!in_array($orderByDirection, ['asc','desc'])) {
            $orderByDirection = 'asc';
        }

        if(!in_array($orderByColumn, ['id','title'])) {
            $orderByColumn = 'id';
        }

        return PostResource::collection(Post::with('category')
        ->when($request->filled('category_id'), function ($query) use ($request) {
            return $query->where('category_id', $request->category_id);
        })
        ->orderBy($orderByColumn,$orderByDirection)
        ->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return new PostResource($post);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}