<?php

namespace App\Http\Controllers;

use App\Http\Requests\PhotoPostRequest;
use App\Models\Photo;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class PhotoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {        
        return view('photos.index',['photos' => Photo::with('user')->latest()->get()]);
        // , [
        //     'photos' => Photo::with('user')->latest()->get(),
        // ]
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PhotoPostRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $file = $request->file('file_upload');
        $fileName = $file->getClientOriginalName();
        $filePath = $file->store('uploads', 'public');

        $request->user()->photos()->create($validated);

        return redirect(route('photos.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Photo $photo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Photo $photo)
    {
        Gate::authorize('update', $photo);
        return view('photos.edit', [

            'photo' => $photo,

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PhotoPostRequest $request, Photo $photo): RedirectResponse
    {
        Gate::authorize('update', $photo);
        $validated = $request->validated();

        $photo->update($validated); 

        return redirect(route('photos.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Photo $photo): RedirectResponse
    {
        Gate::authorize('delete', $photo);

        $photo->delete();
        
        return redirect(route('photos.index'));
    }
}
