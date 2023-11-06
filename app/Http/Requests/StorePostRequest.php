<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title'=>'required',
            'content'=>'required',
            'category_id'=>['required','integer'],
            'thumbnail'=>'nullable|file|mimes:csv,jpg,png,jpeg|max:2048'
        ];
    }

    public function attributes(): array{
        return['category_id'=>'category'];
    }
}