<?php

use App\Http\Controllers\PhotoController;
use App\Http\Controllers\BasketController;
use App\Http\Controllers\PhotoshopController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('photos', PhotoController::class)
    ->only(['index','store','edit','update','destroy'])
    ->middleware(['auth', 'verified']);

Route::resource('photoshop', PhotoshopController::class)
->only(['index'])
->middleware(['auth', 'verified']);
    
Route::resource('orders', OrderController::class)
->only(['index'])
->middleware(['auth', 'verified']);

Route::resource('baskets', BasketController::class)
->only(['index'])
->middleware(['auth', 'verified']);

Route::post('basket/{photo_id}', [BasketController::class, 'addPhoto'])->name('basket');
Route::post('basket.update/{photo_id}', [BasketController::class, 'updatePhoto'])->name('basket.update');

require __DIR__.'/auth.php';
