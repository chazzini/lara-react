<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
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

        $filterable = ['id','content','title'];

        if(!in_array($orderByDirection, ['asc','desc'])) {
            $orderByDirection = 'asc';
        }

        if(!in_array($orderByColumn, ['id','title'])) {
            $orderByColumn = 'id';
        }

        return PostResource::collection(Post::with('category')
        ->when($request->filled('category_id'), function ($query) use ($request) {
             $query->where('category_id', $request->category_id);
        })
        ->when($request->filled('global'), function ($query) use ($request, $filterable)
        {
            foreach($filterable as $column) {
                if($column === $filterable[0]){
                    $query->where($column,'like','%'. $request->global.'%');
                }else{

                    $query->orWhere($column,'like','%'. $request->global.'%');
                }
            }
        })
        ->orderBy($orderByColumn,$orderByDirection)
        ->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {

        $post = Post::create($request->validated());

        //check if api recieves file
        if($request->hasFile('thumbnail')){

           $fileName = time().'_'.$request->file('thumbnail')->getClientOriginalName();
            $filePath = $request->file('thumbnail')->storeAs('uploads', $fileName, 'public');
            $destinationPath = 'uploads';
            $request->file('thumbnail')->move($destinationPath,$fileName);
        }


        return new PostResource($post);
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
    public function update(StorePostRequest $request, Post $post)
    {
        $post->update($request->validated());

        return new PostResource($post);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
            $post->delete();
            return response()->noContent();
    }
}