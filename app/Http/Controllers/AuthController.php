<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller{

    public function index(LoginRequest $request)
    {
        $user = User::where("email", $request->email)->first();
        if(!$user || !Hash::check($request->password, $user->password)){
            return response()->json(['message'=> 'Email or password is incorrect'],401);
        }
        $token = $user->createToken('auth_token')->plainTextToken;

        $cookie = cookie('token',$token,60*24);

        return response()->json([ 'user' => new UserResource($user)])->withCookie($cookie);

    }

    public function store(RegisterRequest $request)
    {
        $user = User::create([
            'name'=> $request->name,
            'email'=> $request->email,
            'password'=> Hash::make($request->password),
        ]);
        $token = $user->createToken('auth_token')->plainTextToken;

        $cookie = cookie('token',$token,60*24);

        return response()->json([
            'user' => new UserResource($user)
            ])->withCookie($cookie);
    }

    public function destroy(Request $request){

        $request->user()->currentAccessToken()->delete();

        $cookie = cookie()->forget('token');

        return response()->json([ 'message'=> 'Logged out successfully'] )->withCookie($cookie);
    }

}