<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use Illuminate\Http\Request;

class PhotoshopController extends Controller
{
    public function index()
    {        
        return view('photoshop.index',['photos' => Photo::with('user')->latest()->get()]);
        // , [
        //     'photos' => Photo::with('user')->latest()->get(),
        // ]
    }
}
