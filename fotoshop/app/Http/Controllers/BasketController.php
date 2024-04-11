<?php

namespace App\Http\Controllers;

// use App\Http\Requests\BasketPostRequest;
use App\Models\Basket;
use App\Models\Photo;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\File;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class BasketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('baskets.index',['basket' => auth()->user()->basket->photos]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function addPhoto(Request $request, int $photo_id)//: RedirectResponse
    {        
        $photo = Photo::find($photo_id);
        $basket = auth()->user()->basket;

        if(!$basket){
            $basket = new Basket();
            $basket->user_id = auth()->user()->id;
            $basket->save();
        }
        //store in basket

        $basket_photo = $basket->photos()->find($photo);
        if(!$basket_photo){
            $basket->photos()->save($photo);
        }
        else{
            $basket_photo->pivot->quantity += $request->quantity;
            $basket_photo->pivot->save();
        }
        return redirect(route('photoshop.index'));
    }
    public function updatePhoto(Request $request, int $photo_id)//: RedirectResponse
    {        
        $basket_photo = auth()->user()->basket->photos()->find(Photo::find($photo_id));

        $basket_photo->pivot->quantity = $request->quantity;
        $basket_photo->pivot->save();

        return redirect(route('baskets.index'));
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
    public function show(Basket $basket)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Basket $basket)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Basket $basket)
    {
        Gate::authorize('update', $basket);
        $validated = $request->validated();

        $basket->update($validated); 

        return redirect(route('photoshop.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Basket $basket)
    {
        //
    }
}
